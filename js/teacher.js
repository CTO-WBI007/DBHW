Vue.component('teacher', {
  template: `
    <div>
      <div>
        <input type="text" placeholder="请输入课程名称" v-model="searchName">
        <button @click="search">搜索</button>
        <button @click="showall">显示全部</button><br>
        <button @click="addCourse">添加我的课程</button>
        <button @click="logout">退出系统</button><br>
        <input type="checkbox" v-model="showMyCourse"> 显示我的课程
        <table>
          <thead>
            <tr>
              <th>课程编号</th>
              <th>课程名称</th>
              <th>授课教师</th>
              <th>学分</th>
              <th>开课学期</th>
              <th>课程类型</th>
              <th>上限人数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in paginatedCourses" :key="course.id">
              <td>{{ course.id }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.teacher }}</td>
              <td>{{ course.credits }}</td>
              <td>{{ course.semester }}</td>
              <td>{{ course.type }}</td>
              <td>{{ course.limit }}</td>
              <td v-if="isMyCourse(course)">
                <button @click="editCourse(course)">修改</button>
                <button @click="deleteCourse(course)">删除</button>
              </td>
              <td v-else>
                <button style="color:white;background-color:gray;" @click="cannotEdit">修改</button>
                <button style="color:white;background-color:gray;" @click="cannotEdit">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <span>{{ currentPage }}/{{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
        <!-- 添加课程模态框 -->
        <div v-if="showAddModal" class="modal">
          <div class="modal-content">
            <h3>添加我的课程</h3>
            <input type="text" v-model="newCourse.id" placeholder="课程编号">
            <input type="text" v-model="newCourse.name" placeholder="课程名称">
            <input type="text" v-model="newCourse.credits" placeholder="学分">
            <input type="text" v-model="newCourse.semester" placeholder="开课学期">
            <input type="text" v-model="newCourse.type" placeholder="课程类型">
            <button @click="saveCourse">保存</button>
            <button @click="showAddModal = false">关闭</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      courses: [
        { id: 3001, name: '数据结构', teacher: '张老师', credits: 3, semester: '2023秋季', limit: 100, type: '必修' },
        { id: 3002, name: '操作系统', teacher: '李老师', credits: 4, semester: '2023秋季', limit: 100, type: '必修' },
        { id: 3003, name: '计算机网络', teacher: '王老师', credits: 3, semester: '2023春季', limit: 100, type: '选修' },
        { id: 3004, name: '数据库原理', teacher: '赵老师', credits: 3, semester: '2023春季', limit: 100, type: '必修' }
      ],
      issearch: false,
      searchName: '',
      currentPage: 1,
      pageSize: 5,
      showAddModal: false,
      showMyCourse: false, // 初始化为 false，显示全部课程
      newCourse: {
        id: '',
        name: '',
        teacher: '当前老师', // 替换为实际的老师名称
        credits: '',
        semester: '',
        limit: 100,
        type: ''
      }
    };
  },
  computed: {
    myCourses() {
      return this.courses.filter(course => course.teacher === '当前老师'); // 替换为实际的老师名称
    },
    filteredCourses() {
      if (this.issearch) {
        return this.currentCourses.filter(course =>
          course.name.includes(this.searchName)
        );
      } else {
        return this.currentCourses;
      }
    },
    currentCourses() {
      return this.showMyCourse ? this.myCourses : this.courses;
    },
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredCourses.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.pageSize);
    }
  },
  methods: {
    search() {
      this.issearch = true;
    },
    showall() {
      this.issearch = false;
      this.showMyCourse = false; // 显示全部课程
    },
    addCourse() {
      this.showAddModal = true;
    },
    saveCourse() {
      this.courses.push({ ...this.newCourse });
      this.showAddModal = false;
      this.newCourse = {
        id: '',
        name: '',
        teacher: '当前老师', // 替换为实际的老师名称
        credits: '',
        semester: '',
        type: ''
      };
    },
    editCourse(course) {
      // 实现编辑课程信息的逻辑
      alert(`编辑 ${course.name} 的信息`);
    },
    deleteCourse(course) {
      // 只能删除自己的课程
      const index = this.courses.indexOf(course);
      if (index !== -1 && course.teacher === '当前老师') { // 替换为实际的老师名称
        this.courses.splice(index, 1);
      }
    },
    logout() {
      // 实现退出系统的逻辑
      alert('退出系统');
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    isMyCourse(course) {
      return course.teacher === '当前老师'; // 替换为实际的老师名称
    },
    cannotEdit() {
      alert("不能修改或删除别人的课程");
    }
  }
});