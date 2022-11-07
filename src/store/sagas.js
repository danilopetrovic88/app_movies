import * as activeUserSagas from "./activeUser/sagas";
import * as moviesSagas from "./movies/saga"

const sagas = {
  ...activeUserSagas,
  ...moviesSagas
};

export default sagas;