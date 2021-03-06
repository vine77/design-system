import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Actions from './Actions';

const propTypes = {
  /** Should the Toolbar have a top and bottom border */
  border: PropTypes.bool,
  /** Children may include Tabs or Toolbar.Actions */
  children: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Height in percent, e.g. "100%", or pixels */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
  border: false,
  children: null,
  className: '',
  height: null,
};

const Toolbar = ({ border, children, className, height }) => (
  <div
    className={classNames('rc-toolbar', className, {
      'rc-toolbar-border': border,
    })}
    style={{ height }}
  >
    {children}
  </div>
);

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

Toolbar.Actions = Actions;

export default Toolbar;
