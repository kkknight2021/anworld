
<template>
	<el-main>
		<div class="box">
			<div class="img_left">
				<img src="../assets/关于我们/A.jpg" alt="图A">
			</div>
			<div class="text_right">
				<div>
					<h3>主题介绍</h3>
					<span>&emsp;&emsp;安宁疗护，是指为疾病终末期或老年患者在临终前提供身体、心理、精神等方面的照料和人文关怀等服务，控制痛苦和不适症状，提高生命质量，
						帮助患者舒安详、有尊严地离世。</span>
					<br>
					<span>&emsp;&emsp;安宁疗护与一般医院末期患者照顾的比较：</span>
					<div>
						<el-table
							:data="tableData" style="width: 562px">
							<el-table-column prop="label" label="" width="105">
							</el-table-column>
							<el-table-column prop="hospice" label="安宁疗护" width="210">
							</el-table-column>
							<el-table-column prop="ordinary" label="一般末期患者照顾" >
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>

		<div class="box">
			<div class="img_right">
				<img src="../assets/关于我们/B.jpg" alt="图B">
			</div>
			<div class="text_left">
				<div>
					<h3>公司概述</h3>
					<span>&emsp;&emsp;工作室名称“anworld”中的“an”既是“安宁”的拼音缩写，也是英语单词“一个”的意思。“anworld”既代表“安宁世界”，也寓意着我们和所有需要安宁疗护的人群都是处在同一个世界的，我们将会付诸行动，让安宁疗护行业更多与的人、事、物产生联结，让每个不幸面对危及生命的终末期疾病的公民，都能获得安宁缓和医疗服务所带来的身心安宁，得到最好的医疗照顾，达成善生，善终，善别。</span>
					<br>
					<span>&emsp;&emsp;工作室将依托网站建设、程序开发等技术，打造以网站、APP、小程序为核心的安宁疗护服务平台——“安宁世界”，为为安宁疗护提供一站式服务和全方位支持。</span>
				</div>
			</div>
		</div>

		<div class="box">
			<div class="img_left">
				<img src="../assets/关于我们/C.jpg" alt="图C">
			</div>
			<div class="text_right">
				<div>
					<h3>公司愿景</h3>
					<span>&emsp;&emsp;我们将致力于：</span>
					<ul>
						<li>支持相关专业教育和培训；</li>
						<li>提高公众对安宁疗护的认识和理解；</li>
						<li>推动安宁疗护真正成为一项社会运动；</li>
						<li>推广安宁疗护服务质量评鉴标准和指南；</li>
						<li>发动社会力量，帮助经济欠发达地区建立安宁疗护机构；</li>
						<li>为安宁疗护提供一站式服务和全方位支持，促进安宁疗护行业发展。</li>
					</ul>
					<span>&emsp;&emsp;我们认同HospiceUK组织和其他世界领先的安宁缓和医疗组织提出的理念：每个人在其整个生命重要的权利，直到他们临终，没有人应该忍受可以避免的痛苦；获得安宁缓和医疗服务，享有身心灵的全面关怀，是每一个人在生命终末期的基本人权。</span>
					<br>
					<span>&emsp;&emsp;我们的愿景是，在不久的将来，安宁缓和医疗将纳入国家医疗卫生服务体系，得到全面的普及。</span>
				</div>
			</div>
		</div>


	</el-main>

</template>

<script>
export default {
  data() {
    return {
      msg: '',
      tableData: [{
        label: '目的',
        hospice: '提高生命质量，强调活得有尊严',
        ordinary: '延长患者生命，缺乏对患者心理与精神状态的关注'
      }, {
        label: '手段',
        hospice: '政府保障、团队照顾、社会支持、家庭照料',
        ordinary: '用各种医疗设备进行治疗，只注重医护手段'
      }, {
        label: '追求目标',
        hospice: '强调安宁，患者得到生理与心理支持，兼顾质与量',
        ordinary: '追求延长生命，忽略过度治疗带来的痛苦'
      }, {
        label: '公众接受程度',
        hospice: '逐渐被公众接受，值得推广',
        ordinary: '更多人开始思考这种做法是否有价值'
      }]
    }
  },
}
</script>

<style scoped>
.el-main {
	padding: 50px;
	display: flex;
	justify-content: center;
  flex-direction: column;
  align-items: center
}
.box {
	width: 1250px;
	height: 400px;
	margin: 30px;
}
img {
	width: 100%;
	height: 100%
}
/* .img_right .img_left {
	margin: 0 10px;
	width: 500px;
	height: 100%
} */
.img_right {
	margin: 0 10px;
	width: 45%;
	height: 100%;
	float: right;
}
.img_left {
	float: left;
	margin: 0 10px;
	width: 45%;
	height: 100%
}

.text_left {
	margin: auto 0;
	height: 100%;
	width: 45%;
	text-align: left;
	float: left;
	display: flex;
	justify-content: center;
  flex-direction: column;
  align-items: center
}
.text_right {
	margin: auto 0;
	height: 100%;
	width: 45%;
	text-align: left;
	float: right;
	display: flex;
	justify-content: center;
  flex-direction: column;
  align-items: center
}
/* .text_right .text_left {
	margin: 0 10px;
	width: 500px;
	text-align: left;
} */
</style>
