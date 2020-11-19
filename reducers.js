export default function counter(state = {'value': 0, 'root': "none"}, action) {
  switch (action.type) {
    case 'INCREMENT':
      state.value += 1
      return state
    case 'DECREMENT':
      state.value -= 1
      return state
    case 'ROOT':
      state.root = JSON.stringify(action.payload)
      return state
    default:
      return state
  }
}
