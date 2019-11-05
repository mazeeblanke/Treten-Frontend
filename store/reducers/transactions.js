import { transformArray } from "../../lib/helpers";
import { TRANSACTIONS_PAGE_SIZE } from "../../lib/constants";
import { CSVLink } from "react-csv";

const paginationOptions = (options = {}) => {
  return {
    total: options.total || 0,
    current: options.page,
    pageSize: TRANSACTIONS_PAGE_SIZE,
    itemRender: (current, type, originalElement) => {
      if (type === "prev") {
        return (
          <div className="ant-pagination-prev">
            <a className="ant-pagination-item-link">
              <img src="/static/images/arrow-right-grey.png" />
            </a>
          </div>
        );
      }
      if (type === "next") {
        return (
          <div className="ant-pagination-next">
            <a className="ant-pagination-item-link">
              <img src="/static/images/arrow-left-grey.png" />
            </a>
          </div>
        );
      }
      return originalElement;
    }
  };
};

const INITIAL_STATE = {
  byIds: [],
  all: {},
  total: 0,
  isLoadingTransactions: false,
  pagination: paginationOptions()
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_TRANSACTIONS": {
      return {
        ...state,
        ...transformArray(action.payload.data.data),
        total: action.payload.total,
        pagination: paginationOptions({
          page: action.payload.page,
					pageSize: action.payload.pageSize,
					total: action.payload.data.total
        })
      };
    }
    case "SET_LOADING_TRANSACTIONS": {
      // console.log('mmsndbndhdh', state);
      return {
        ...state,
        isLoadingTransactions: action.payload
      };
    }
  }
  return state;
};

export const getTransactions = ({ transactions }) => {
  return transactions.byIds.map(id => {
    return transactions.all[id];
  });
};
