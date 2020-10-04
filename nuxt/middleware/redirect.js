export default function({ store, redirect, route }) {
  if (store.state.search == "") return redirect("/");
}
