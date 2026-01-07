'use client';
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@/tools/withStyles';
import { SoundsContext } from '@/components/SoundsContext';
import { Text } from '@/components/Text';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: '15px 0',
        marginBottom: 10,
        '@media (max-width: 768px)': {
            gap: 12,
            padding: '10px 0',
        },
    },
    navButton: {
        width: 40,
        height: 40,
        border: `2px solid ${theme.color.primary.dark}`,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: theme.color.primary.main,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        flexShrink: 0,
        '&:hover': {
            backgroundColor: theme.color.primary.dark,
            color: theme.color.text.primary,
            transform: 'scale(1.1)',
            boxShadow: `0 0 15px ${theme.color.primary.main}`,
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
        '&:disabled': {
            opacity: 0.3,
            cursor: 'not-allowed',
            '&:hover': {
                backgroundColor: 'transparent',
                transform: 'none',
                boxShadow: 'none',
            },
        },
        '@media (max-width: 768px)': {
            width: 36,
            height: 36,
            fontSize: 16,
        },
    },
    eventInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        minWidth: 200,
        '@media (max-width: 768px)': {
            minWidth: 150,
        },
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.color.text.primary,
        fontFamily: theme.typography.primary,
        textAlign: 'center',
        textShadow: `0 0 10px ${theme.color.primary.dark}`,
        '@media (max-width: 768px)': {
            fontSize: 14,
        },
    },
    eventMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    category: {
        fontSize: 11,
        color: theme.color.primary.main,
        textTransform: 'uppercase',
        letterSpacing: 1,
        '@media (max-width: 768px)': {
            fontSize: 9,
        },
    },
    counter: {
        fontSize: 11,
        color: theme.color.text.secondary,
        '@media (max-width: 768px)': {
            fontSize: 9,
        },
    },
});

class EventNavHeader extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        eventName: PropTypes.string,
        category: PropTypes.string,
        currentIndex: PropTypes.number,
        totalEvents: PropTypes.number,
        onPrev: PropTypes.func.isRequired,
        onNext: PropTypes.func.isRequired,
        canNavigate: PropTypes.bool,
        hideArrows: PropTypes.bool,
    };

    static defaultProps = {
        eventName: 'Event',
        category: '',
        currentIndex: 0,
        totalEvents: 0,
        canNavigate: true,
        hideArrows: false,
    };

    static contextType = SoundsContext;

    handlePrev = () => {
        const sounds = this.context;
        if (sounds?.click) {
            sounds.click.play();
        }
        this.props.onPrev();
    };

    handleNext = () => {
        const sounds = this.context;
        if (sounds?.click) {
            sounds.click.play();
        }
        this.props.onNext();
    };

    handleHover = () => {
        const sounds = this.context;
        if (sounds?.hover) {
            sounds.hover.play();
        }
    };

    render() {
        const { classes, eventName, category, currentIndex, totalEvents, canNavigate, hideArrows } = this.props;

        return (
            <div className={classes.root}>
                {!hideArrows && (
                    <button
                        className={classes.navButton}
                        onClick={this.handlePrev}
                        onMouseEnter={this.handleHover}
                        disabled={!canNavigate}
                        aria-label="Previous event"
                    >
                        ←
                    </button>
                )}

                <div className={classes.eventInfo}>
                    <span className={classes.eventName}>
                        <Text>{eventName}</Text>
                    </span>
                    <div className={classes.eventMeta}>
                        {category && <span className={classes.category}>{category}</span>}
                        {totalEvents > 0 && (
                            <span className={classes.counter}>
                                {currentIndex + 1} / {totalEvents}
                            </span>
                        )}
                    </div>
                </div>

                {!hideArrows && (
                    <button
                        className={classes.navButton}
                        onClick={this.handleNext}
                        onMouseEnter={this.handleHover}
                        disabled={!canNavigate}
                        aria-label="Next event"
                    >
                        →
                    </button>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(EventNavHeader);
