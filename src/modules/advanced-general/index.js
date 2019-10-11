/**
 * External dependencies
 */
import {
	AdvancedRangeControl,
	ResponsiveControl,
} from '~stackable/components'
import { createAllCombinationAttributes, appendImportant } from '~stackable/util'

/**
 * WordPress dependencies
 */
import {
	__, _x, sprintf,
} from '@wordpress/i18n'
import {
	addFilter, applyFilters, doAction,
} from '@wordpress/hooks'
import { PanelBody, SelectControl } from '@wordpress/components'
import deepmerge from 'deepmerge'
import { Fragment } from '@wordpress/element'
import { i18n } from 'stackable'

const inspectorControls = ( blockName, options ) => ( output, props ) => {
	const { setAttributes } = props
	const {
		blockTag = 'div',
	} = props.attributes

	return (
		<Fragment>
			{ output }
			<PanelBody
				title={ __( 'General', i18n ) }
				initialOpen={ false }
			>
				{ applyFilters( `stackable.${ blockName }.edit.advanced.general.before`, null, props ) }
				{ options.blockTag &&
					<SelectControl
						label={ sprintf( _x( '%s HTML Tag', 'component' ), __( 'Block', i18n ) ) }
						value={ blockTag }
						options={ [
							{ value: '', label: _x( 'Div', 'HTML Tag', i18n ) },
							{ value: 'section', label: _x( 'Section', 'HTML Tag', i18n ) },
							{ value: 'article', label: _x( 'Article', 'HTML Tag', i18n ) },
							{ value: 'aside', label: _x( 'Aside', 'HTML Tag', i18n ) },
							{ value: 'main', label: _x( 'Main', 'HTML Tag', i18n ) },
							{ value: 'header', label: _x( 'Header', 'HTML Tag', i18n ) },
							{ value: 'footer', label: _x( 'Footer', 'HTML Tag', i18n ) },
							{ value: 'nav', label: _x( 'Nav', 'HTML Tag', i18n ) },
							{ value: 'address', label: _x( 'Address', 'HTML Tag', i18n ) },
							{ value: 'hgroup', label: _x( 'Hgroup', 'HTML Tag', i18n ) },
						] }
						onChange={ blockTag => setAttributes( { blockTag } ) }
					/>
				}

				{ options.zIndex &&
					<ResponsiveControl
						attrNameTemplate="%sBlockZIndex"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					>
						<AdvancedRangeControl
							label={ __( 'Z-Index', i18n ) }
							min={ -100 }
							max={ 1000 }
							allowReset={ true }
						/>
					</ResponsiveControl>
				}

				{ applyFilters( `stackable.${ blockName }.edit.advanced.general.after`, null, props ) }
			</PanelBody>
		</Fragment>
	)
}

const addToStyleObject = () => ( styleObject, props ) => {
	const getValue = ( attrName, format = '' ) => {
		const value = typeof props.attributes[ attrName ] === 'undefined' ? '' : props.attributes[ attrName ]
		return value !== '' ? ( format ? sprintf( format, value ) : value ) : undefined
	}

	const blockClass = `.${ props.mainClassName }`

	const others = {
		[ blockClass ]: {
			zIndex: appendImportant( getValue( 'blockZIndex' ) ),
		},
		tablet: {
			[ blockClass ]: {
				zIndex: appendImportant( getValue( 'tabletBlockZIndex' ) ),
			},
		},
		mobile: {
			[ blockClass ]: {
				zIndex: appendImportant( getValue( 'mobileBlockZIndex' ) ),
			},
		},
	}

	return deepmerge.all( [ styleObject, others ] )
}

const addAttributes = attributes => {
	return {
		...attributes,

		blockTag: {
			type: 'string',
			default: '',
		},
		...createAllCombinationAttributes(
			'%sBlockZIndex',
			{
				type: 'number',
				default: '',
			},
			[ '', 'Tablet', 'Mobile' ]
		),
	}
}

const advancedBlockGeneral = ( blockName, options = {} ) => {
	const optionsToPass = {
		blockTag: true,
		zIndex: true,
		modifyStyles: true,
		...options,
	}

	addFilter( `stackable.${ blockName }.edit.inspector.advanced.before`, `stackable/${ blockName }/advanced-general`, inspectorControls( blockName, optionsToPass ), 2 )
	if ( optionsToPass.modifyStyles ) {
		addFilter( `stackable.${ blockName }.styles`, `stackable/${ blockName }/advanced-general`, addToStyleObject( blockName, optionsToPass ) )
	}
	addFilter( `stackable.${ blockName }.attributes`, `stackable/${ blockName }/advanced-general`, addAttributes )
	doAction( `stackable.module.advanced-general`, blockName )
}

export default advancedBlockGeneral
