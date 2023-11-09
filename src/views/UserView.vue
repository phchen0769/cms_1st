<template>
	<div class="select-box">
		<el-form :inline="true" :model="selectData" class="demo-form-inline">
			<el-row :gutter="20">
				<el-col :span="6">
					<!-- 标题搜索框 -->
					<el-form-item label="姓名">
						<el-input v-model="selectData.nickName" placeholder="请输入姓名" clearable /> </el-form-item
				></el-col>

				<el-col :span="6">
					<!-- 角色选择器 -->
					<el-form-item label="角色">
						<el-select v-model="selectData.roleId" class="m-2" placeholder="请选择：">
							<el-option label="全部" :value="0" />
							<el-option
								v-for="item in roleList"
								:key="item.roleId"
								:label="item.roleName"
								:value="item.roleId"
							/>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<!-- 搜索提交按钮 -->
					<el-form-item>
						<el-button type="primary" @click="onSubmit"> 查询 </el-button>
					</el-form-item></el-col
				>
			</el-row>
		</el-form>
	</div>

	<!-- talbe -->
	<div>
		<el-table :data="userList" border style="width: 100%">
			<el-table-column prop="id" label="ID" width="180" />
			<el-table-column prop="nickName" label="姓名" width="180" />
			<el-table-column prop="role" label="角色">
				<!-- 插槽 显示用户权限-->
				<template #default="scope">
					<el-button v-for="item in scope.row.role" :key="item.roleId" link size="small">
						{{ item.roleName }}
					</el-button>
				</template>
			</el-table-column>

			<el-table-column prop="role" label="操作">
				<!-- 插槽 编辑用户权限-->
				<template #default="scope">
					<el-button link type="primary" size="small" @click="changeUser(scope.row)"> 编辑 </el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>

	<!-- 弹出框 -->
	<el-dialog v-model="isShow" title="用户信息编辑">
		<el-form :model="activeUser">
			<!-- 姓名 -->
			<el-form-item label="姓名" label-width="50px">
				<el-input v-model="activeUser.nickName" autocomplete="off" />
			</el-form-item>

			<!-- 角色 -->
			<el-form-item label="角色" label-width="50px">
				<el-select multiple v-model="activeUser.role" placeholder="请选择一个角色">
					<el-option
						v-for="item in roleList"
						:key="item.roleId"
						:label="item.roleName"
						:value="item.roleId"
					/>
				</el-select>
			</el-form-item>
		</el-form>
		<!-- 弹出框底部按钮 -->
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="updateUser">更改</el-button>
				<el-button @click="isShow = false">取消</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
import { getUserList, getRoleList } from '@/request/api';
import { InitData, type UserListInt } from '@/type/users';

export default defineComponent({
	setup() {
		onMounted(() => {
			getUsers();
			getRoles();
		});

		// 构造数据对象
		const data = reactive(new InitData());

		// 从后台获取用户列表
		const getUsers = () => {
			getUserList().then(res => {
				data.userList = res.data;
				// console.log(data.userList);
			});
		};

		// 获取角色列表
		const getRoles = () => {
			getRoleList().then(res => {
				data.roleList = res.data;
				// console.log(data.roleList);
			});
		};

		const onSubmit = () => {
			//定义数组，用来接收查询过后要展示的数据
			let arr: UserListInt[] = [];

			// console.log(data.selectData.roleId);

			// 判断两个是否其中一个有值
			if (data.selectData.nickName || data.selectData.roleId) {
				// 搜索框
				if (data.selectData.nickName) {
					// 将过滤出来的数据复制给arr
					arr = data.userList.filter(value => {
						return value.nickName.indexOf(data.selectData.nickName) !== -1;
					});
				}

				// 选择栏
				if (data.selectData.roleId) {
					arr = (data.selectData.nickName ? arr : data.userList).filter(value => {
						// console.log(value.role.find((item)=>item.roleId === data.selectData.roleId))
						return value.role.find(item => item.roleId === data.selectData.roleId);
					});
				}
			} else {
				arr = data.userList;
			}
			data.userList = arr;
		};

		//监听输入框两个属性
		watch([() => data.selectData.roleId, () => data.selectData.nickName], () => {
			if (data.selectData.roleId == 0 || data.selectData.nickName == '') {
				getUsers();
			}
		});

		// 编辑按钮事件
		const changeUser = (row: UserListInt) => {
			// 显示编辑框
			data.isShow = true;
			// data.activeUser.nickName = row.nickName
			// data.activeUser.role = row.role;

			data.activeUser = {
				id: row.id,
				nickName: row.nickName,
				userName: row.userName,
				// 把对象列表取id映射成数组
				role: row.role.map(value => value.roleId),
			};
			// console.log(data.activeUser.role);
		};

		// 更新用户信息事件
		const updateUser = () => {
			let obj: any = data.userList.find(value => value.id == data.activeUser.id);
			obj.nickName = data.activeUser.nickName;
			obj.role = data.roleList.filter(value => data.activeUser.role.indexOf(value.roleId) !== -1);
			// 更新前台页面
			data.userList.forEach((item, i) => {
				if (item.id == obj.id) {
					data.userList[i] = obj;
				}
			});

			// 把数据提交到后台
			// 准备要提交的数据
			const requestData = {
				id: obj.id,
				nickName: obj.nickName,
				role: obj.role.map(role => role.roleId),
			};

			// 发送数据到后台
			axios
				.put('your-backend-api-endpoint', requestData) // 使用 PUT 请求，替换为你的后端 API 端点
				.then(response => {
					console.log('数据已成功提交到后台', response.data);
					data.isShow = false; // 隐藏编辑框
				})
				.catch(error => {
					console.error('数据提交失败', error);
				});
		};

		//

		data.isShow = false;

		return { ...toRefs(data), onSubmit, changeUser, updateUser };
	},
});
</script>

<style scoped lang="scss">
.select-box {
	height: 80px;
}
</style>
