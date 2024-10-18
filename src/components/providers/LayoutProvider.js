"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../lib/store/store";
import { SessionProvider } from "next-auth/react";

export default function LayoutProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>{children}</SessionProvider>
      </PersistGate>
    </Provider>
  );
}
