import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Delete Wiki Space Member',
	value: 'deleteSpaceMember',
	order: 97,
	options: [
		{
			displayName: 'Wiki Space ID',
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Member ID',
			name: 'member_id',
			type: 'string',
			required: true,
			default: '',
			description: 'Member or admin ID, the value type is determined by the member type parameter',
		},
		{
			displayName: 'Member Type',
			name: 'member_type',
			type: 'options',
			required: true,
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: 'Chat ID', value: 'openchat' },
				{ name: 'User ID', value: 'userid' },
				{ name: 'Email', value: 'email' },
				{ name: 'Department ID', value: 'opendepartmentid' },
				{ name: 'Open ID', value: 'openid' },
				{ name: 'Union ID', value: 'unionid' },
			],
			default: 'openid',
			description: 'Identity type of the member or admin to delete',
		},
		{
			displayName: 'Role',
			name: 'member_role',
			type: 'options',
			required: true,
			options: [
				{ name: 'Admin', value: 'admin' },
				{ name: 'Member', value: 'member' },
			],
			default: 'member',
			description: 'Role type of the member',
		},
		{
			displayName: 'Collaborator Type',
			name: 'type',
			type: 'options',
			options: [
				{ name: 'User', value: 'user' },
				{ name: 'Group', value: 'chat' },
				{ name: 'Department', value: 'department' },
			],
			default: 'user',
			description: 'Wiki collaborator type (not supported yet)',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const memberId = this.getNodeParameter('member_id', index) as string;
		const memberType = this.getNodeParameter('member_type', index) as string;
		const memberRole = this.getNodeParameter('member_role', index) as string;
		const type = this.getNodeParameter('type', index) as string;

		const body: IDataObject = {
			member_type: memberType,
			member_role: memberRole,
		};

		if (type) {
			body.type = type;
		}

		return RequestUtils.request.call(this, {
			method: 'DELETE',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/members/${memberId}`,
			body,
		});
	},
} as ResourceOperation;
