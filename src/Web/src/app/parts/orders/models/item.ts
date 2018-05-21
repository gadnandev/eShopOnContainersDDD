import { types, getRoot, getEnv, flow } from 'mobx-state-tree';
import * as validate from 'validate.js';
import uuid from 'uuid/v4';
import Debug from 'debug';

import { models } from '../../../utils';
import { FormatDefinition, FieldDefinition } from '../../../components/models';

import { DTOs } from '../../../utils/eShop.dtos';
import { ApiClientType } from '../../../stores';

import { OrderItemType as OrderItemTypeBase, OrderItemModel as OrderItemModelBase } from '../../../models/ordering/orderitem';

const debug = new Debug('order items');

export interface OrderItemType extends OrderItemTypeBase {
  readonly itemPrice: number;
  readonly productPicture: string;
  readonly formatting: {[idx: string]: FormatDefinition};
}
export const OrderItemModel = OrderItemModelBase
  .views(self => ({
    get itemPrice() {
      return self.price || self.productPrice;
    },
    get formatting() {
      return ({
        itemPrice: {
          currency: true,
          normalize: 2
        },
        quantity: {
          trim: true
        },
        subTotal: {
          currency: true,
          normalize: 2
        },
        additionalFees: {
          currency: true,
          normalize: 2
        },
        additionalTaxes: {
          currency: true,
          normalize: 2
        },
        total: {
          currency: true,
          normalize: 2
        }
      });
    },
    get productPicture() {
      if (!self.productPictureContents) {
        return;
      }
      return 'data:' + self.productPictureContentType + ';base64,' + self.productPictureContents;
    },
  }));

export interface OrderItemListType {
  entries: Map<string, OrderItemType>;
  loading: boolean;

  list: (orderId: string) => Promise<{}>;
}
export const OrderItemListModel = types
.model('Ordering_OrderItem_List', {
  entries: types.optional(types.map(OrderItemModel), {}),
  loading: types.optional(types.boolean, true)
})
.actions(self => {
  const list = flow(function*(orderId: string) {
    const request = new DTOs.ListOrderItems();

    request.orderId = orderId;

    self.loading = true;
    try {
      const client = getEnv(self).api as ApiClientType;
      const results: DTOs.PagedResponse<DTOs.OrderingOrderItem> = yield client.paged(request);

      results.records.forEach(record => {
        self.entries.put(record);
      });
    } catch (error) {
      debug('received http error: ', error);
    }
    self.loading = false;
  });
  return { list };
});
