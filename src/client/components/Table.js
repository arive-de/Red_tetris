import React from 'react'

import './Table.scss'

const Table = () => {


  return (
    <div class="table-container" role="table" aria-label="Destinations">
      <div class="flex-table header" role="rowgroup">
        <div class="flex-row first" role="columnheader">Room</div>
        <div class="flex-row" role="columnheader">Game</div>
        <div class="flex-row" role="columnheader">Players</div>
        <div class="flex-row" role="columnheader">Status</div>
      </div>
     <div class="flex-table row" role="rowgroup">
        <div class="flex-row first" role="cell"> United Kingdom</div>
        <div class="flex-row" role="cell">Stonehenge, Windsor and Bath with Pub Lunch </div>
        <div class="flex-row" role="cell">19 Sep, 1p.m.</div>
        <div class="flex-row" role="cell">US$500</div>
     </div>
    <div class="flex-table row" role="rowgroup">
      <div class="flex-row first"  role="cell"> Canada</div>
      <div class="flex-row" role="cell">Vancouver to Victoria and Butchart Gardens Tour </div>
      <div class="flex-row" role="cell">23 Sep, 1:30p.m.</div>
      <div class="flex-row" role="cell">US$387</div>
    </div>
    <div class="flex-table row" role="rowgroup">
      <div class="flex-row first" role="cell"> Australia</div>
      <div class="flex-row" role="cell">Blue Mountains Tours</div>
      <div class="flex-row" role="cell">9 Sep, 2p.m.</div>
      <div class="flex-row" role="cell">US$400</div>
    </div>
      <div class="flex-table row" role="rowgroup">
        <div class="flex-row first" role="cell"> New Zealand</div>
        <div class="flex-row" role="cell">Milford Sound Coach & Cruise</div>
        <div class="flex-row" role="cell">12 Sep, 2p.m.</div>
        <div class="flex-row" role="cell">US$400</div>
      </div>
    </div>
  )
}

export default (Table)
