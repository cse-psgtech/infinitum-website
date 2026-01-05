'use client';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { AppContent } from '../AppContent';

class Component extends React.Component {
  static displayName = 'Header';

  static propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.any,
    children: PropTypes.any
  };

  componentDidMount () {
    window.addEventListener('route-change-start', this.onRouteChangeStart);
    window.addEventListener('route-change', this.onRouteChange);
  }

  componentWillUnmount () {
    window.removeEventListener('route-change-start', this.onRouteChangeStart);
    window.removeEventListener('route-change', this.onRouteChange);
  }

  onRouteChangeStart = ({ detail: { isInternal, href } }) => {
    if (isInternal && href === '/') {
      // Header and Footer removed
    }
  }

  onRouteChange = () => {
    this.contentElement.scrollTo(0, 0);
  }

  render () {
    const {
      theme,
      classes,
      className,
      children,
      ...etc
    } = this.props;

    return (
      <div className={cx(classes.root, className)} {...etc}>
        <div
          className={classes.content}
          ref={ref => (this.contentElement = ref)}
        >
          <AppContent>
            {children}
          </AppContent>
        </div>
      </div>
    );
  }
}

export { Component };

