import { BaseControl, Toolbar } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import SVGH1 from './images/heading1.svg'
import SVGH2 from './images/heading2.svg'
import SVGH3 from './images/heading3.svg'
import SVGH4 from './images/heading4.svg'
import SVGH5 from './images/heading5.svg'
import SVGH6 from './images/heading6.svg'

const TAG_OPTIONS = [
	{
		value: 'h1',
		title: __( 'Heading 1' ),
		icon: <SVGH1 />,
	},
	{
		value: 'h2',
		title: __( 'Heading 2' ),
		icon: <SVGH2 />,
	},
	{
		value: 'h3',
		title: __( 'Heading 3' ),
		icon: <SVGH3 />,
	},
	{
		value: 'h4',
		title: __( 'Heading 4' ),
		icon: <SVGH4 />,
	},
	{
		value: 'h5',
		title: __( 'Heading 5' ),
		icon: <SVGH5 />,
	},
	{
		value: 'h6',
		title: __( 'Heading 6' ),
		icon: <SVGH6 />,
	},
]

const HeadingButtonsControl = props => {
	const {
		label,
		value,
		onChange,
	} = props

	return (
		<BaseControl
			label={ label }
			className="ugb-heading-buttons-control"
		>
			<Toolbar
				className="ugb-toolbar-full-width"
				controls={
					TAG_OPTIONS.map( option => {
						return {
							...option,
							onclick: () => onChange( option.value ),
							isActive: value === option.value,
						}
					} )
				}
			/>
		</BaseControl>
	)
}

HeadingButtonsControl.defaultProps = {
	label: __( 'HTML Tag' ),
	value: TAG_OPTIONS[ 0 ].value,
	onChange: () => {},
}

export default HeadingButtonsControl
