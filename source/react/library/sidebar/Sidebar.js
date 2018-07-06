import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getKey } from '../../helpers/statics';
import Button from '../buttons/Button';
import Section from './Section';
import Subsection from './Subsection';
import SubsectionItem from './SubsectionItem';

const propTypes = {
  children: PropTypes.any,
  /** Easy prop for enabling icon only sidebar */
  toggleable: PropTypes.bool,
  /** Is sidebar minimized? */
  minimized: PropTypes.bool,
};

const defaultProps = {
  children: [],
  toggleable: false,
  minimized: false,
};

/**
 * `Sidebar` displays high-level navigation with optional subsections and actions.
 */
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      minimized: props.minimized,
    };

    this.onClick = this.onClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onClick(title) {
    this.setState({ selected: title });
  }

  onToggle() {
    this.setState({ minimized: !this.state.minimized });
  }

  getSections() {
    return React.Children.map(this.props.children, (section, idx) => {
      const props = {
        key: getKey(section, idx),
        onClick: this.onClick,
        selected: this.state.selected,
      };

      return React.cloneElement(section, props);
    });
  }

  getToggle() {
    let icon = 'chevron-left';

    if (this.state.minimized) {
      icon = 'chevron-right';
    }

    return (
      <div className="rc-sidebar-toggle">
        <Button className="rc-sidebar-toggle-btn" onClick={ this.onToggle } size="tiny" icon={ icon } />
      </div>
    );
  }

  render() {
    const sections = this.getSections();
    const className = classnames('rc-sidebar', {
      'rc-sidebar-minimized': this.state.minimized,
    });

    let toggle;
    if (this.props.toggleable) {
      toggle = this.getToggle();
    }

    const props = {
      className,
    };

    return (
      <div { ...props }>
        { sections }
        { toggle }
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

Sidebar.Section = Section;
Sidebar.Subsection = Subsection;
Sidebar.SubsectionItem = SubsectionItem;

export default Sidebar;
