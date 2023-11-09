// 用户接口里的子接口
interface RoleInt {
	roleId: number;
	roleName: string;
}

// 用户列表接口
export interface UserListInt {
	id: number;
	nickName: string;
	userName: string;
	role: RoleInt[];
}

// 被选中用户列表接口
interface ActiveInt {
	id: number;
	nickName: string;
	userName: string;
	role: number[];
}

// 角色列表接口
export interface RoleListInt {
	authority: number[];
	roleId: number;
	roleName: string;
}

// 选中数据接口
export interface SelectDataInt {
	roleId: number;
	nickName: string;
}

// 回传页面的初始化数据类
export class InitData {
	selectData: SelectDataInt = {
		roleId: 0,
		nickName: '',
	};

	// 接收用户信息列表
	userList: UserListInt[] = [];

	// 接收角色信息列表
	roleList: RoleListInt[] = [];

	isShow = false;

	// 选中的对象
	activeUser: ActiveInt = {
		id: 0,
		nickName: '',
		userName: '',
		role: [],
	};
}
