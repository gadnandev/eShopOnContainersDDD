import * as React from 'react';
import { observer } from 'mobx-react';
import { hot } from 'react-hot-loader';

import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';

import { sort } from '../../../utils';
import { Using, Formatted } from '../../../components/models';
import { BuyerStoreType, BuyerStoreModel } from '../stores/buyers';

interface BuyerViewProps {
  store?: BuyerStoreType;
}

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  container: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  button: {
    margin: theme.spacing.unit,
    color: theme.palette.primary.light
  }
});

@observer
class BuyerView extends React.Component<BuyerViewProps & WithStyles<'root' | 'container' | 'table' | 'avatar' | 'row' | 'button'>, {}> {

  public render() {
    const { store, classes } = this.props;

    const buyers = sort(Array.from(store.buyers.values()), 'id');
    return (
      <div className={classes.root}>
        <Grid container justify='center'>
          <Grid item xs={8}>
            <Paper className={classes.container}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Buyer Name</TableCell>
                    <TableCell>Purchasing</TableCell>
                    <TableCell>Last Order</TableCell>
                    <TableCell>Preferred Address</TableCell>
                    <TableCell>Preferred Payment</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {buyers.map(buyer => (
                    <TableRow hover key={buyer.id} className={classes.row}>
                      <Using model={buyer}>
                        <TableCell component='th' scope='row'>
                          <Typography variant='subheading'>{buyer.givenName}</Typography>
                          <Tooltip title='whether the guyer is in good standing'><Typography variant='body1' color='textSecondary'>{buyer.goodStanding ? 'GOOD' : 'SUSPENDED'}</Typography></Tooltip>

                        </TableCell>
                        <TableCell numeric>
                          <Typography variant='subheading'>Spent: {buyer.totalSpent}</Typography>
                          <Typography variant='body1' color='textSecondary'>Orders: {buyer.totalOrders}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='caption'>{buyer.preferredCity}, {buyer.preferredState}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='caption'>{buyer.preferredPaymentCardholder}</Typography>
                          <Typography variant='body1' color='textSecondary'>{buyer.preferredPaymentMethod} <strong>{buyer.preferredPaymentExpiration}</strong></Typography>
                        </TableCell>
                      </Using>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default hot(module)(withStyles(styles as any)(BuyerView));
