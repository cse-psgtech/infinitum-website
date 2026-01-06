'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@/tools/withStyles';
import { Main } from '@/components/Main';
import { Secuence } from '@/components/Secuence';
import { Schedule } from '@/components/Schedule';

const styles = theme => ({
    root: {
        padding: [0, 0], // Reduced padding
        maxWidth: '100% !important', // Force full width
        width: '100%'
    },
    content: {
        marginTop: '0 !important',
        paddingTop: '0 !important'
    }
});

class SchedulePage extends React.Component {
    static propTypes = {
        classes: PropTypes.object
    };

    render() {
        const { classes } = this.props;

        return (
            <Main className={classes.root} classes={{ content: classes.content }}>
                <Secuence stagger>
                    <Schedule />
                </Secuence>
            </Main>
        );
    }
}

export default withStyles(styles)(SchedulePage);
