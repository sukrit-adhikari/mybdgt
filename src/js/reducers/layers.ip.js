const layersIP = {
  "ip_ip_version": "4",
  "ip_ip_hdr_len": "20",
  "ip_ip_dsfield": "0x00000000",
  "ip_dsfield_ip_dsfield_dscp": "0",
  "ip_dsfield_ip_dsfield_ecn": "0",
  "ip_ip_len": "40",
  "ip_ip_id": "0x0000250a",
  "ip_ip_flags": "0x00000000",
  "ip_flags_ip_flags_rb": "0",
  "ip_flags_ip_flags_df": "0",
  "ip_flags_ip_flags_mf": "0",
  "ip_flags_ip_frag_offset": "0",
  "ip_ip_ttl": "119",
  "ip_ip_proto": "6",
  "ip_ip_checksum": "0x00000c48",
  "ip_ip_checksum_status": "2",
  "ip_ip_src": "172.217.164.100",
  "ip_ip_addr": [
    "172.217.164.100",
    "192.168.0.152"
  ],
  "ip_ip_src_host": "172.217.164.100",
  "ip_ip_host": [
    "172.217.164.100",
    "192.168.0.152"
  ],
  "ip_ip_dst": "192.168.0.152",
  "ip_ip_dst_host": "192.168.0.152"
};


export default function layersIP(state = { transactions: [] }, action) {
  switch (action.type) {
    default:
      return state
  }
}