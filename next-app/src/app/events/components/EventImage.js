'use client';
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@/tools/withStyles';
import { CometCard } from '@/components/ui/comet-card';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    imageWrapper: {
        width: '100%',
        maxWidth: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 768px)': {
            maxWidth: 250,
        },
    },
    card: {
        width: 220,
        height: 300,
        backgroundColor: '#0a0a0a',
        borderRadius: 16,
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        '@media (max-width: 768px)': {
            width: 200,
            height: 270,
        },
    },
    imageContainer: {
        width: '100%',
        height: '75%',
        backgroundColor: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'relative',
        zIndex: 2,
    },
    placeholder: {
        fontSize: 64,
        opacity: 0.5,
        zIndex: 2,
    },
    info: {
        padding: 12,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        height: '25%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderTop: `1px solid ${theme.color.primary.dark}`,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.color.text.primary,
        marginBottom: 4,
        fontFamily: theme.typography.primary,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '@media (max-width: 768px)': {
            fontSize: 12,
        },
    },
    category: {
        fontSize: 10,
        color: theme.color.primary.main,
        textTransform: 'uppercase',
        letterSpacing: 1,
        '@media (max-width: 768px)': {
            fontSize: 9,
        },
    },
});

class EventImage extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        event: PropTypes.object,
    };

    render() {
        const { classes, event } = this.props;

        if (!event) {
            return null;
        }

        return (
            <div className={classes.root}>
                <div className={classes.imageWrapper}>
                    <CometCard
                        borderColor="rgba(199, 32, 113, 0.7)"
                        glowColor="rgba(199, 32, 113, 0.5)"
                    >
                        <div className={classes.card}>
                            <div className={classes.imageContainer}>
                                <img
                                    src="/images/events/paper_presentation.png"
                                    alt={event.eventName}
                                    className={classes.image}
                                />
                            </div>
                            <div className={classes.info}>
                                <div className={classes.title}>{event.eventName}</div>
                                <div className={classes.category}>{event.category}</div>
                            </div>
                        </div>
                    </CometCard>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(EventImage);
