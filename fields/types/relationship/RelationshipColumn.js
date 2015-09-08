import React from 'react';
import ItemsTableCell from '../../../admin/src/components/ItemsTableCell';
import ItemsTableValue from '../../../admin/src/components/ItemsTableValue';

var RelationshipColumn = React.createClass({
	displayName: 'RelationshipColumn',
	propTypes: {
		col: React.PropTypes.object,
		data: React.PropTypes.object,
	},
	renderMany (value) {
		let refList = this.props.col.field.refList;
		let items = [];
		for (let i = 0; i < 3; i++) {
			if (!value[i]) break;
			if (i) {
				items.push(<span key={'comma' + i}>, </span>);
			}
			items.push(
				<ItemsTableValue interior truncate={false} key={'anchor' + i} href={'/keystone/' + refList.path + '/' + value[i].id}>
					{value[i].name}
				</ItemsTableValue>
			);
		}
		if (value.length > 3) {
			items.push(<span key="more" className="ItemList__more-indicator">[...{value.length - 3} more]</span>);
		}
		return (
			<ItemsTableValue field={this.props.col.type}>
				{items}
			</ItemsTableValue>
		);
	},
	renderValue (value) {
		let refList = this.props.col.field.refList;
		return (
			<ItemsTableValue href={'/keystone/' + refList.path + '/' + value.id} padded interior field={this.props.col.type}>
				{value.name}
			</ItemsTableValue>
		);
	},
	render () {
		let value = this.props.data.fields[this.props.col.path];
		let many = this.props.col.field.many;
		if (!value || (many && !value.length)) return null;

		return (
			<ItemsTableCell>
				{many ? this.renderMany(value) : this.renderValue(value)}
			</ItemsTableCell>
		);
	}
});

module.exports = RelationshipColumn;
