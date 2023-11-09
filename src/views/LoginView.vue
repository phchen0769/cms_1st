<template>
	<div class="login-box">
		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			status-icon
			:rules="rules"
			label-width="80px"
			class="demo-ruleForm"
		>
			<h2>后台管理系统</h2>

			<!-- 用户名 -->
			<el-form-item label="账号：" prop="username">
				<el-input v-model="ruleForm.username" autocomplete="off" />
			</el-form-item>

			<!-- 密码 -->
			<el-form-item label="密码：" prop="password">
				<el-input v-model="ruleForm.password" type="password" autocomplete="off" />
			</el-form-item>

			<!-- 登录和重置按钮 -->
			<el-form-item>
				<el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)"> 登录 </el-button>
				<el-button class="loginBtn" @click="resetForm(ruleFormRef)"> 重置 </el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance } from 'element-plus';
// 通过login.ts规范数据类型
import { LoginData } from '@/type/login';
import { login } from '@/request/api';

export default defineComponent({
	setup() {
		// 实例化LoginData对象
		const data = reactive(new LoginData());

		// Element plus 表单校验规则
		const rules = {
			username: [
				{ required: true, message: '请输入你的账号！', trigger: 'blur' },
				{
					min: 3,
					max: 10,
					message: '账号的长度应该是3到10！',
					trigger: 'blur',
				},
			],
			password: [
				{ required: true, message: '请输入你的密码！', trigger: 'blur' },
				{
					min: 3,
					max: 10,
					message: '密码的长度应该是3到10！',
					trigger: 'blur',
				},
			],
		};

		// 登录
		const router = useRouter();

		const ruleFormRef = ref<FormInstance>();

		const submitForm = async (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			// 对表单的内容进行验证，valid布尔类型，为true表示验证成功，反之。
			await formEl.validate((valid, fields) => {
				if (valid) {
					// console.log('submit!')
					login(data.ruleForm).then(res => {
						console.log(res);
						// 将token进行保存
						localStorage.setItem('token', res.data.userInfo.token);
						// 跳转页面到首页
						router.push('/');
					});
				} else {
					console.log('登录错误！', fields);
					return false;
				}
			});
			// console.log(formEl);
		};

		// 重置
		const resetForm = (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			formEl.resetFields();
		};

		return { ...toRefs(data), rules, resetForm, ruleFormRef, submitForm };
	},
});
</script>

<style lang="scss" scoped>
.login-box {
	width: 100%;
	height: 100vh;
	background: url('../assets/bg.png');
	padding: 1px;
	text-align: center;

	.demo-ruleForm {
		width: 500px;
		margin: 200px auto;
		padding: 40px;
		background-color: #fff;
		border-radius: 1em;
	}

	.loginBtn {
		width: 40%;
	}

	h2 {
		margin-bottom: 10px;
	}
}
</style>
