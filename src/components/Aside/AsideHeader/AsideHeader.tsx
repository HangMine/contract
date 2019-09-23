import React from 'react'
import './AsideHeader.scss'

type prop = {
  collapse: boolean
}
const AsideHeader: React.FC<prop> = ({ collapse }) => {
  return (
    <div className="aside-header" style={{ marginLeft: collapse ? '15px' : '5px' }}>
      <img src={require('@/logo.svg')} alt="logo" />
      {!collapse && <h1 className="aside-header-title">合同线上审批系统</h1>}
    </div>
  )
}

export default AsideHeader;