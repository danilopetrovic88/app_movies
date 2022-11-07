import { takeLatest, call, put } from "redux-saga/effects";
import { loginUser, logoutUser, registerUser, getUser } from "../../services/authService";
import {
  setActiveUser,
  setToken,
  login,
  register,
  logout,
  getActiveUser,
} from "./slice";

// workers
function* handleLogin({payload}) {
  try {
    const {data} = yield call(loginUser, payload);
    localStorage.setItem("token", data.token);
    const user = yield call(getUser);
    console.log("activeUser/sagas.js", user);
    yield put(setActiveUser(user));
    yield put(setToken(data.token));
  } catch {
    alert("Invalid credentials");
  }
}

function* handleRegister(action) {
  try {
    const {data} = yield call(registerUser, action.payload);

    yield put(setActiveUser(data));
  } catch (error) {
    alert("Registration failed");
  }
}

function* handleLogout() {
  try {
    yield call(logoutUser);
    localStorage.removeItem("token");

    yield put(setToken(null));
    yield put(setActiveUser(null));
  } catch (error) {}
}

function* handleGetActiveUser() {
  try {
    const activeUser = yield call(getUser);
    yield put(setActiveUser(activeUser));
  } catch (error) {}
}

// watchers
export function* watchLogin() {
  yield takeLatest(login.type, handleLogin);
}
export function* watchRegister() {
  yield takeLatest(register.type, handleRegister);
}
export function* watchLogout() {
  yield takeLatest(logout.type, handleLogout);
}
export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, handleGetActiveUser);
}