// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../../config'
// ** Custom Components
import Avatar from '@components/avatar'
import { db } from "../../../../services/firebase"
// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'

// ** Reactstrap Imports
import { Button, Badge, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Form, Label} from 'reactstrap'
// import Switch from '../../../../views/forms/form-elements/switch'

const NotificationDropdown = () => {
  // ** Notification Array
 
  const me = JSON.parse(localStorage.getItem('userData'))
  const [notificationsArray, setNotificationArray] = useState([])
  let notifications = []
  const [notiStatus, setNotiStatus] = useState(me.web_setting)
  const [emailStatus, setEmailStatus] = useState(me.email_setting)
  let users = []
  const handleNotification = (item) => {
    const Ref = db.ref("notification").child(item.key).child('status')
    Ref.transaction(function(status) {
      status = 1
      return status
    })
  }
  const handleAllRead = () => {
    notificationsArray.map(item => {
      const Ref = db.ref("notification").child(item.key).child('status')
      Ref.transaction(function(status) {
        status = 1
        return status
      })
    })
  }
  const handleNotiStatus = (status) => {
    const formData = new FormData()
    formData.append("status", status)
    formData.append("user_id", me._id)
    axios.post(`${config.BASE_URL}profile/updateNotiStatus`, formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
      setNotiStatus(status)
      console.log(response)
    })
  }
  const handleEmailStatus = (status) => {
    const formData = new FormData()
    formData.append("status", status)
    formData.append("user_id", me._id)
    axios.post(`${config.BASE_URL}profile/updateEmailStatus`, formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
      setEmailStatus(status)
      console.log(response)
    })
  }
  useEffect(() => {
    axios.post(`${config.BASE_URL}profile/userList`).then(response => {
      users = response.data.users
    })
    const database = db.ref("notification")
    database.on("value", function(data) {
      if (data.val()) {
          console.log("data---->", Object.keys(data.val()))
          const notiArray = Object.values(data.val())
          const notiKey = Object.keys(data.val())
          notiArray.map((item, index) => {
            item.key = notiKey[index]
          })
          notifications = notiArray.filter(item => item.to === me._id && item.status === 0)
          notifications.map(item => {
            item.user = users.find(item1 => item1._id === item.from)
          })
          setNotificationArray(notifications)
          console.log(notifications)
      }
    })
  }, [])
  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {notificationsArray.map((item, index) => {
          return (
            <div
              key={index}
              className='d-flex'
              onClick={() => handleNotification(item)}
            >
              <div
                className={classnames('list-item d-flex', {
                  'align-items-start': !item.switch,
                  'align-items-center': item.switch
                })}
              >
                {!item.switch ? (
                  <Fragment>
                    <div className='me-1'>
                      <Avatar
                        {...(item.user.avatar
                          ? { img: item.user.avatar, imgHeight: 32, imgWidth: 32 }
                          :  null)}
                      />
                    </div>
                    <div className='list-item-body flex-grow-1'>
                      {item.type === 0 ? 'follows you' : 
                      item.type === 1 ? 'cancelled following you' : 
                      item.type === 2 ? 'likes you' : 
                      item.type === 3 ? 'cancelled liking you' :
                      item.type === 4 ? 'likes your post' :
                      item.type === 5 ? 'cancelled liking your post' :
                      item.type === 6 ? 'commented to your post' : null}
                      <small className='notification-text'>{item.subtitle}</small>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    {item.title}
                    {item.switch}
                  </Fragment>
                )}
              </div>
            </div>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        { (notificationsArray.length && notiStatus) ? (
        <Badge pill color='danger' className='badge-up'>
          {notificationsArray.length}
        </Badge>) : null}
      </DropdownToggle>
      <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header d-flex justify-content-between align-items-center'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
            
          </DropdownItem>
          <div className='form-check form-switch'>
            <Input type='switch' onChange={(e) => handleEmailStatus(e.target.checked)} defaultChecked={emailStatus} id="email_noti"/>
            <Label for='email_noti'>Email</Label>
          </div>
          <div className='form-check form-switch me-75'>
            <Input type='switch' onChange={(e) => handleNotiStatus(e.target.checked)} defaultChecked={notiStatus} id="web_noti" />
            <Label for='web_noti'>Website</Label>
          </div>
        </li>
        {notiStatus ? renderNotificationItems() : null}
        <li className='dropdown-menu-footer'>
          <Button color='primary' onClick={handleAllRead}>
            Read all notifications
          </Button>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
