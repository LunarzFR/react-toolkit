import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Constants } from '@axa-fr/react-toolkit-core';
import PopoverBase from './PopoverBase';
import PopoverPlacements from './PopoverPlacements';
import PopoverModes from './PopoverModes';

const propTypes = {
  ...Constants.propTypes,
  children: PropTypes.any,
  placement: PropTypes.oneOf([
    PopoverPlacements.top,
    PopoverPlacements.bottom,
    PopoverPlacements.left,
    PopoverPlacements.right,
  ]),
  mode: PropTypes.oneOf([PopoverModes.over, PopoverModes.click]),
};
const defaultClassName = 'af-popover__container';
const defaultProps = {
  ...Constants.defaultProps,
  className: defaultClassName,
  placement: PopoverPlacements.top,
  mode: PopoverModes.click,
};

export const PopoverClick = props => {
  const { children, placement, className, classModifier } = props;

  const wrapperRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [isHover, setHover] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [wrapperRef]);

  const click = () => {
    setOpen(!isOpen && isHover);
  };

  const enter = () => {
    setHover(true);
  };

  const leave = () => {
    setHover(false);
  };

  return (
    <button
      ref={wrapperRef}
      className="af-popover__wrapper"
      type="button"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={click}>
      <PopoverBase
        isOpen={isOpen}
        placement={placement}
        className={className}
        classModifier={classModifier}>
        {children}
      </PopoverBase>
    </button>
  );
};

export const PopoverOver = props => {
  const { children, placement, className, classModifier } = props;
  const [isOpen, setOpen] = useState(false);

  const enter = () => {
    setOpen(true);
  };

  const leave = () => {
    setOpen(false);
  };

  return (
    <span onMouseEnter={enter} onMouseLeave={leave}>
      <PopoverBase
        isOpen={isOpen}
        placement={placement}
        className={className}
        classModifier={classModifier}>
        {children}
      </PopoverBase>
    </span>
  );
};

const Popover = props => {
  const { children, placement, className, classModifier, mode } = props;
  const DynamicComponent =
    mode === PopoverModes.click ? PopoverClick : PopoverOver;

  return (
    <DynamicComponent
      className={className}
      classModifier={classModifier}
      placement={placement}>
      {children}
    </DynamicComponent>
  );
};

Popover.Pop = PopoverBase.Pop;
Popover.Pop.displayName = 'Popover.Pop';

Popover.Over = PopoverBase.Over;
Popover.Over.displayName = 'Popover.Over';

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
