import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Add Wiki Space Member',
	value: 'addSpaceMember',
	order: 95,
	options: [
		{
			displayName: 'Wiki Space ID',
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Member Type',
			name: 'member_type',
			type: 'options',
			required: true,
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: 'Group ID', value: 'openchat' },
				{ name: 'User ID', value: 'userid' },
				{ name: 'Email', value: 'email' },
				{ name: 'Department ID', value: 'opendepartmentid' },
				{ name: 'Open ID', value: 'openid' },
				{ name: 'Union ID', value: 'unionid' },
			],
			default: 'openid',
			description: 'Identity type of the member or admin to add',
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
			displayName: 'Send Notification',
			name: 'need_notification',
			type: 'boolean',
			default: false,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const memberType = this.getNodeParameter('member_type', index) as string;
		const memberId = this.getNodeParameter('member_id', index) as string;
		const memberRole = this.getNodeParameter('member_role', index) as string;
		const needNotification = this.getNodeParameter('need_notification', index) as boolean;

		const body: IDataObject = {
			member_type: memberType,
			member_id: memberId,
			member_role: memberRole,
		};

		const qs: IDataObject = {};
		if (needNotification !== undefined) {
			qs.need_notification = needNotification;
		}

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/members`,
			body,
			qs,
		});
	},
} as ResourceOperation;
