import { transformArray } from "../../lib/helpers";
const uuidv1 = require("uuid/v1");

const paginationOptions = (tab, newState, options = {}) => {
  return {
    total: newState ? newState["manageUsers"][tab].total : 0,
    pageSize: options.pageSize,
    current: options.page,
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
  manageUsers: {
    activeTab: "students",
    students: {
      byIds: [],
      all: {},
      total: 0,
      isLoading: false,
      isShowingAddNewForm: false,
      feedback: "",
      pagination: paginationOptions("students")
    },
    admin: {
      byIds: [],
      all: {},
      isShowingAddNewForm: false,
      feedback: "",
      isLoading: false,
      pagination: paginationOptions("admin"),
      form: [
        {
          email: "",
          id: uuidv1()
        }
      ]
    },
    instructors: {
      byIds: [],
      all: {},
      total: 0,
      feedback: "",
      isLoading: false,
      pagination: paginationOptions("instructors"),
      isShowingAddNewForm: false,
      assignInstructorForm: {
        course: "",
        batch: "",
        user: {}
      },
      form: [
        {
          email: "",
          id: uuidv1()
        }
      ]
    }
  }
};

export default function(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case "SET_INSTUCTORS_LOADING": {
      let manageUsers = { ...state.manageUsers };
      manageUsers.instructors.isLoading = payload;
      return {
        manageUsers
      };
    }
    case "SET_ADMINS_LOADING": {
    }
    case "SET_STUDENTS_LOADING": {
      let manageUsers = { ...state.manageUsers };
      manageUsers.students.isLoading = payload;
      return {
        manageUsers
      };
    }

    case "SET_ADD_USERS_FORM": {
      let newState = { ...state };
      newState["manageUsers"][payload.userType] = {
        ...newState["manageUsers"][payload.userType],
        isShowingAddNewForm: payload.isShowingAddNewForm
      };
      return {
        ...state,
        ...newState
      };
    }

    case "SET_INSTRUCTORS": {
      let newState = { ...state };

      newState["manageUsers"]["instructors"] = {
        ...newState["manageUsers"]["instructors"],
        ...transformArray(payload.data.data),
        total: payload.data.total
      };

      newState["manageUsers"]["instructors"]["pagination"] = paginationOptions(
        "instructors",
        newState,
        { page: payload.page, pageSize: payload.pageSize }
      );

      return {
        ...state,
        ...newState
      };
    }

    case "SET_STUDENTS": {
      let newState = { ...state };

      newState["manageUsers"]["students"] = {
        ...newState["manageUsers"]["students"],
        ...transformArray(payload.data.data),
        total: payload.data.total
      };

      newState["manageUsers"]["students"]["pagination"] = paginationOptions(
        "students",
        newState,
        { page: payload.page, pageSize: payload.pageSize }
      );

      return {
        ...state,
        ...newState
      };
    }
    default:
      return state;
  }
}
