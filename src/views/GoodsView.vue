<template>
	<div>
		<!-- 搜索栏 -->
		<div class="select-box">
			<el-form :inline="true" :model="selectData" class="demo-form-inline">
				<!-- 标题搜索框 -->
				<el-form-item label="标题">
					<el-input v-model="selectData.title" placeholder="请输入关键字" clearable />
				</el-form-item>

				<!-- 详情搜索框 -->
				<el-form-item label="详情">
					<el-input v-model="selectData.introduce" placeholder="请输入关键字" clearable />
				</el-form-item>

				<!-- 搜索提交按钮 -->
				<el-form-item>
					<el-button type="primary" @click="onSubmit"> 搜索 </el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- talbe -->
		<div>
			<el-table :data="dataList.comList" border style="width: 100%">
				<el-table-column prop="id" label="ID" width="180" />
				<el-table-column prop="title" label="标题" width="180" />
				<el-table-column prop="introduce" label="详情" />
			</el-table>
		</div>

		<!-- pagination -->
		<el-pagination
			@current-change="currentChange"
			@size-change="sizeChange"
			small
			background
			layout="prev, pager, next"
			:total="selectData.count"
			class="mt-4"
		/>
		<!-- total的值按照10条进行分页 -->
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
import { getGoodsList } from '@/request/api';
import { InitData, type ListInt } from '@/type/goods';

export default defineComponent({
	setup() {
		const data = reactive(new InitData());

		onMounted(() => {
			getGoods();
		});

		const getGoods = () => {
			getGoodsList().then(res => {
				// console.log(res);
				data.list = res.data.list;
				data.selectData.count = res.data.list.length;
			});
		};

		// 定义对象 数据分页
		const dataList = reactive({
			comList: computed(() => {
				// 1-->[1-10]
				// 2-->[11-20]
				return data.list.slice(
					(data.selectData.page - 1) * data.selectData.pageSize,
					data.selectData.page * data.selectData.pageSize
				);
			}),
		});

		const currentChange = (page: number) => {
			data.selectData.page = page;
		};

		const sizeChange = (pageSize: number) => {
			data.selectData.pageSize = pageSize;
		};

		// 查询
		const onSubmit = () => {
			// console.log(data.selectData.title);
			//定义数组，用来接收查询过后要展示的数据
			let arr: ListInt[] = [];
			// 判断两个是否其中一个有值
			if (data.selectData.title || data.selectData.introduce) {
				if (data.selectData.title) {
					// 将过滤出来的数据复制给arr
					arr = data.list.filter(value => {
						return value.title.indexOf(data.selectData.title) !== -1;
					});
				} else {
					arr = data.list.filter(value => {
						return value.introduce.indexOf(data.selectData.introduce) !== -1;
					});
				}
			} else {
				arr = data.list;
			}
			data.selectData.count = arr.length;
			data.list = arr;
		};
		//监听输入框两个属性
		watch([() => data.selectData.title, () => data.selectData.introduce], () => {
			if (data.selectData.title == '' && data.selectData.introduce == '') {
				getGoods();
			}
		});

		// 类的解构需要使用toRefs，函数的导出直接接在后面即可
		return { ...toRefs(data), currentChange, sizeChange, dataList, onSubmit };
	},
});
</script>

<style lang="scss" scoped></style>
