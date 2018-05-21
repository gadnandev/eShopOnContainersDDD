import * as React from 'react';
import { observer } from 'mobx-react';
import { hot } from 'react-hot-loader';
import glamorous from 'glamorous';

import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';

import { sort } from '../../../utils';
import { Using, Formatted } from '../../../components/models';
import { CatalogStoreType, CatalogStoreModel } from '../stores/catalog';

import AvailableStockForm from '../components/availableStockForm';

import ProductFormAdd from '../views/productAdd';
import ProductFormEdit from '../views/productEdit';

interface CatalogProps {
  store?: CatalogStoreType;
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
class CatalogView extends React.Component<CatalogProps & WithStyles<'root' | 'container' | 'table' | 'avatar' | 'row' | 'button'>, {}> {

  public render() {
    const { store, classes } = this.props;

    const products = sort(Array.from(store.products.values()), 'id');
    return (
      <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item xs={8}>
          <ProductFormAdd list={store}/>
          <Paper className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Catagory Type</TableCell>
                  <TableCell>Catagory Brand</TableCell>
                  <TableCell>Price ($)</TableCell>
                  <TableCell>Available Stock</TableCell>
                  <TableCell>Thresholds</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(p => (
                  <TableRow hover key={p.id} className={classes.row}>
                    <Using model={p}>
                      <TableCell component='th' scope='row'>
                        <ListItem>
                          <Avatar src={p.productPicture} className={classes.avatar} />
                          <ListItemText primary={p.name} secondary={p.description} />
                          <ProductFormEdit product={p} list={store} />
                        </ListItem>
                      </TableCell>
                      <TableCell>{p.catalogType}</TableCell>
                      <TableCell>{p.catalogBrand}</TableCell>
                      <TableCell numeric><Formatted field='price' /></TableCell>
                      <TableCell numeric>
                        <Formatted field='availableStock' />
                        <AvailableStockForm product={p}/>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Restock: <Formatted field='restockThreshold' /></Typography>
                        <Typography variant='body2'>Max Stock: <Formatted field='maxStockThreshold' /></Typography>
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

export default hot(module)(withStyles(styles as any)(CatalogView));
