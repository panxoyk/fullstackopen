import React from 'react';

const Notification = ({ error, alert }) => {
	if (error === null && alert === null) {
		return null
	}

	if (error === null && alert !== null) {
		const message = alert

		return (
			<div className='error green'>
			  {message}
			</div>
	  )
	}

	if (error !== null && alert === null) {
		const message = error

		return (
			<div className='error red'>
			  {message}
			</div>
	  )
	}
}

export default Notification;