import React, { ComponentType } from 'react';
import { ClassManager } from '@axa-fr/react-toolkit-core';

export type CustomFormEvent = {
  value: string;
  name: string;
  id: string;
};
type InputChange = { name: string; onChange: (event: CustomFormEvent) => void };

const defaultOnChange = <P extends InputChange>({ name, onChange }: P) => (
  e: React.ChangeEvent<HTMLInputElement>
) => onChange({ value: e.target.value, name, id: e.target.id });

const defaultWithProps = <
  T extends { className?: string; classModifier?: string }
>(
  defaultClassName: string
) => ({ className, classModifier }: T) => ({
  componentClassName: ClassManager.getComponentClassName(
    className,
    classModifier,
    defaultClassName
  ),
});

type InputProps = { isVisible: boolean } & InputChange & {
    className?: string;
    classModifier?: string;
  };
export const withInput = <P extends InputProps>(
  defaultClassName: string,
  addDefaultProps = {},
  withHandlersOverride = {},
  withPropsOverride?: (props: P) => { className: string }
) => (Component: ComponentType<P>) => (props: P) => {
  if (!props.isVisible) {
    return null;
  }

  const componentProps =
    withPropsOverride || defaultWithProps(defaultClassName);
  const defaultProps = {
    ...addDefaultProps,
    ...props,
  };
  const handlers = {
    onChange: defaultOnChange,
    ...withHandlersOverride,
  };
  const onHandlers = Object.fromEntries(
    Object.entries(handlers).map(([key, value]) => {
      return [key, value(props)];
    })
  );

  return (
    <Component {...defaultProps} {...componentProps(props)} {...onHandlers} />
  );
};
