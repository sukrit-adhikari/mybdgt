import actions from '../actions/index.js';

const layersFrame = {};
layersFrame.sll = {
  "sll_sll_pkttype": null,
  "sll_sll_hatype": null,
  "sll_sll_halen": null,
  "sll_sll_src_eth": null,
  "sll_sll_unused": null,
  "sll_sll_etype": null
}
layersFrame.ethernet = {
  "frame_frame_interface_id": null,
  "frame_interface_id_frame_interface_name": null,
  "frame_frame_encap_type": null,
  "frame_frame_time": null,
  "frame_frame_offset_shift": null,
  "frame_frame_time_epoch": null,
  "frame_frame_time_delta": null,
  "frame_frame_time_delta_displayed": null,
  "frame_frame_time_relative": null,
  "frame_frame_number": null,
  "frame_frame_len": null,
  "frame_frame_cap_len": null,
  "frame_frame_marked": null,
  "frame_frame_ignored": null,
  "frame_frame_protocols": null
}

export default function transaction(state = {transactions:[]}, action) {
    switch (action.type) {
    case actions.REFRESH_TRANSACTIONS:
      const val = Object.assign({},state,{"transactions":action.payload.transactions});
      return val;  
    default:
      return state
    }
}