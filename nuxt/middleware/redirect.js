export default function({ store, redirect }) {
  if (store.state.search == "") return redirect("/");
}
