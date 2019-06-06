export const mutationsReserveVehicle = {
  CHANGE_VISIBILITY (state, payload) {
    state.open = !state.open
    state.veiculoSelecionado = payload.entry || {}
    state.reserva = payload.reserva || {}
  }
}

export default {}
