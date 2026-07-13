import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Update Wiki Space Settings',
	value: 'updateSpaceSettings',
	order: 98,
	options: [
		{
			displayName: 'Wiki Space ID',
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Top-Level Page Creation Permission',
			name: 'create_setting',
			type: 'options',
			options: [
				{ name: 'Admin and Member', value: 'admin_and_member' },
				{ name: 'Admin Only', value: 'admin' },
			],
			default: 'admin_and_member',
			description: 'Who can create top-level pages in the space',
		},
		{
			displayName: 'Document Operation Permission',
			name: 'security_setting',
			type: 'options',
			options: [
				{ name: 'Allow', value: 'allow' },
				{ name: 'Not Allow', value: 'not_allow' },
			],
			default: 'allow',
			description: 'Whether users with read access can create copies/print/export/copy',
		},
		{
			displayName: 'Comment Permission',
			name: 'comment_setting',
			type: 'options',
			options: [
				{ name: 'Allow', value: 'allow' },
				{ name: 'Not Allow', value: 'not_allow' },
			],
			default: 'allow',
			description: 'Whether users with read access can comment',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const createSetting = this.getNodeParameter('create_setting', index) as string;
		const securitySetting = this.getNodeParameter('security_setting', index) as string;
		const commentSetting = this.getNodeParameter('comment_setting', index) as string;

		const body: IDataObject = {};

		if (createSetting) {
			body.create_setting = createSetting;
		}
		if (securitySetting) {
			body.security_setting = securitySetting;
		}
		if (commentSetting) {
			body.comment_setting = commentSetting;
		}

		return RequestUtils.request.call(this, {
			method: 'PUT',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/setting`,
			body,
		});
	},
} as ResourceOperation;
