import { createStore, applyMiddleware } from "redux";
import { useDispatch } from "react-redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { todoReducer } from "./todoReducer";
import { IAction } from "./types/actions";

const persistConfig = {
  key: "todos",
  storage,
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export const useStoreDispatch = () =>
  useDispatch<ThunkDispatch<RootState, unknown, IAction>>();
