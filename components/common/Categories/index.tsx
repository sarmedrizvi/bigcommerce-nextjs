import { Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import NestedMenuItem from 'material-ui-nested-menu-item'
import s from '../Navbar/Navbar.module.css'
import Router from 'next/router'
const Categories = ({ navChildren }: any) => {
  const [menuPosition, setMenuPosition] = useState<any>(null)
  const handleItemClick = (event: React.MouseEvent, link: String) => {
    if (link) {
      Router.push(`/search${link}`)
    }
    setMenuPosition(null)
  }
  const handleRightClick = (event: React.MouseEvent) => {
    if (menuPosition) {
      return
    }
    event.preventDefault()
    setMenuPosition({
      top: event.pageY,
      left: event.pageX,
    })
  }

  const renderTree = (nodes: any) => (
    <div>
      {nodes.children.length && Array.isArray(nodes.children) ? (
        <NestedMenuItem
          parentMenuOpen={!!menuPosition}
          onClick={(e) => handleItemClick(e, nodes.url)}
          label={nodes.name}
        >
          {nodes.children.map((node: any) => renderTree(node))}
        </NestedMenuItem>
      ) : (
        <MenuItem onClick={(e) => handleItemClick(e, nodes.url)}>
          {nodes.name}
        </MenuItem>
      )}
    </div>
  )
  return (
    <>
      <span onClick={handleRightClick} className={s.link}>
        Categories
      </span>
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        {navChildren.data.map((item: any) => renderTree(item))}
      </Menu>
    </>
  )
}

export default Categories
