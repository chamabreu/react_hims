import { Route, Switch } from "react-router-dom";
import Field from "./Field/Field";

export default function Rack() {
  return (
    <Switch>
      <Route path="/lager/:rack/field">
        <Field />
      </Route>
      <Route path="/lager/:rack">
        <h1>The Rack Overview</h1>
      </Route>
    </Switch>
  )
};
