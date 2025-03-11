import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {headers} from '../../utils/commonHeaders';
import {Endpoints} from '../../utils/Endpoints';
import {axiosInstance} from '../../utils/axiosInstanceCourse';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export interface CourseType {
  id: string;
  title: string;
  description: string;
  price: string;
  banner_image: string;
  welcome_msg: string;
  intro_video: string;
  created_at: string;
  Category: {
    id: string;
    name: string;
  };
  Instructor: {
    id: string;
    full_name: string;
    email: string;
  };
  Enrollment: {
    progress: string;
  };
}
export interface Lecture {
  id: string;
  title: string;
  description: string;
  video_path: string | null;
  pdf_path: string | null;
}
export interface RatingPayload {
  course_id: string;
  rating: number;

}

export interface Instructor {
  id: string;
  full_name: string;
  email: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  banner_image: string | null;
  welcome_msg: string;
  intro_video: string | null;
  Lectures: Lecture[];
  Instructor: Instructor;
 
}

export interface CourseContentResponse {
  data: {
    course: Course;
    userProgress: string;
    userRating: string;
    totalStudents: string;
    averageRating:string;
  };
}

export interface UserCourseData {
  data: {
    id: string;
    full_name: string;
    EnrolledCourses?: CourseType[];
    courses?: CourseType[];
  };
  // Assuming the API returns an array of courses
}
export interface InstructorType {
  id: string;
  full_name: string;
  email: string;
  avatar: string;
  total_enrollments: string;
  total_courses: string;
}
export interface Lecture {
  course_id: string;
  title: string;
  description: string;
  video_path: string | null;
  pdf_path: string | null;
}

export interface UploadResponse {
  video_path: string;
  pdf_path?: string;
}

interface categoryReducerProps {
  userCourseData: UserCourseData;
  courseContent: CourseContentResponse | null;
  uploadFileMessage: Object;
  createCourseMessage: Object;
  recommandedData: Object;
  coursesData: Object;
  searchResults: Object;
  loading: boolean;
  categoriesLoading: boolean;
  getUserCourseLoading: boolean;
  instructorLoading: boolean;
  courseDetailLoading: boolean;
  searchLoading: boolean;
  error: string;
  categoriesError: string;
  instructorError: string;
  courseDetailError: string;
  searchError: string;
  getUserCourseError: string;
}

const coursesInitialState: categoryReducerProps = {
  userCourseData: {data: {id: '', full_name: '', EnrolledCourses: [],courses: [],}},
  coursesData: {},
  searchResults: {},
  createCourseMessage:{},
  recommandedData:{},
  uploadFileMessage: {},
  courseContent: null,
  loading: false,
  categoriesLoading: false,
  getUserCourseLoading: false,
  instructorLoading: false,
  courseDetailLoading: false,
  searchLoading: false,
  error: '',
  categoriesError: '',
  instructorError: '',
  courseDetailError: '',
  searchError: '',
  getUserCourseError: '',
};

export const getCourses = createAsyncThunk(
  'courses/getcourses',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(Endpoints.COURSES);
      //  console.log('RESPONSE OF GETCOURSES API:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('GetCourses API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const searchCourse = createAsyncThunk(
  'courses/searchCourse',
  async (query: string, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${Endpoints.SEARCH_COURSE}?search=${query}`,
      );
      // console.log('RESPONSE OF SEARCHCOURSE API:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('SearchCourse API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getTopInstructor = createAsyncThunk(
  'courses/topinstructors',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(Endpoints.TOPINSTRUCTOR);
      // console.log('RESPONSE OF GETINSTRUCTOR API:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('GetInstructor API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getCategories = createAsyncThunk(
  'courses/categories',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(Endpoints.CATEGORIES);
      //   console.log('RESPONSE OF GETCATEGORIESAPI:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('GetCategories API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getCourseDetail = createAsyncThunk(
  'courses/getcoursesDetails',
  async (courseId: string, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${Endpoints.COURSES}/${courseId}`,
      );
      //    console.log('RESPONSE OF get course details API:', courseId);
      return response.data;
    } catch (error: any) {
      console.error('GetCourseDetail API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getUserCourse = createAsyncThunk(
  'courses/getUserCourse',
  async params => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Access Token:', accessToken);

      if (!accessToken) {
        throw new Error('Access Token Not Found');
      }

      const response = await axiosInstance.post(Endpoints.COURSES, params, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      //  console.log('Response getUserdata Data:', response.data);
      return response.data;
    } catch (err: any) {
      console.log('getUserCourset API Error:', err.message);
      throw err;
    }
  },
);

export const getCourseContent = createAsyncThunk(
  'courses/getCourseContent',
  async (courseId: string, {rejectWithValue}) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access Token Not Found');
      }
      console.log("Access Token", accessToken);
      
      const response = await axiosInstance.get(`courses/content/${courseId}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      console.log("Course Content response :", response.data);
      
      return response.data;
    } catch (error: any) {
      console.log('getUserCourseContent API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const uploadFiles = createAsyncThunk(
  'course/uploadFiles',
  async ({ formData}: { formData: FormData}, {rejectWithValue}) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Access Token:', accessToken);

      if (!accessToken) {
        throw new Error('Access Token Not Found');
      }

      const response = await axiosInstance.post('courses/upload/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      //  console.log('Response getUserdata Data:', response.data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (courseData, {rejectWithValue}) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Access Token:', accessToken);

      if (!accessToken) {
        throw new Error('Access Token Not Found');
      }

      const response = await axiosInstance.post('courses/createcourse', courseData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
      
        },
      });

      console.log('Response createCourse Data:', response.data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId, { rejectWithValue }) => {
  try {
    // Retrieve access token from AsyncStorage
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
      return rejectWithValue('No access token found');
    }

    const response = await axiosInstance.delete(`courses/delete/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error:any) {
    return rejectWithValue(error.response?.data || 'Failed to delete course');
  }
});
export const uploadLectureFile = createAsyncThunk(
  'lectures/uploadLectureFile',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return rejectWithValue('No access token found');

      const response = await axiosInstance.post('courses/lectures/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Failed to upload file');
    }
  }
);

// Create Lecture
export const createLecture = createAsyncThunk(
  'courses/lectures/createLecture',
  async (lectureData: Lecture, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return rejectWithValue('No access token found');

      const response = await axiosInstance.post('courses/lectures/createlecture', lectureData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      return response.data;

    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Failed to create lecture');
    }
  }
);

export const getRecommandedCourses= createAsyncThunk(
  'courses/ai/getrecommendations',
  async  params => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access Token Not Found');
      }
      const response = await axiosInstance.get('courses/ai/getrecommendations', {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      console.log('RESPONSE OF get recommanded courses API:', response.data);
      
      return response.data;
    } catch (error: any) {
      console.log('getRecommandedCourses API Error:', error.message);
     
    }
  },
);

export const updateLectureStatus = createAsyncThunk(
  'courses/lectures/updatestatus/',
  async (lectureId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Update Status Access Token:',`courses/lectures/updatestatus/${lectureId}`);
      
      if (!token) return rejectWithValue('No access token found');
 
      const response = await axiosInstance.post(`courses/lectures/updatestatus/${lectureId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

console.log('RESPONSE OF updateLectureStatus API:', response.data);

      return response.data;

    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Failed to create lecture');
    }
  }
);

export const deleteCourseContent = createAsyncThunk('courses/lectures/delete/', async (lectureId:string, { rejectWithValue }) => {
  try {
    // Retrieve access token from AsyncStorage
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
      return rejectWithValue('No access token found');
    }

    const response = await axiosInstance.delete(`courses/lectures/delete/${lectureId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error:any) {
    return rejectWithValue(error.response?.data || 'Failed to delete course');
  }
});

export const updateCourseRating = createAsyncThunk(
  'courses/updateCourseRating',
  async ({course_id, rating}: RatingPayload, {rejectWithValue}) => {
  
    try {
      const token = await AsyncStorage.getItem('accessToken');

      if (!token) {
        return rejectWithValue('No access token found');
      }
      const response = await axiosInstance.put(
        `courses/updatecourserating`,
        {
          course_id,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Thanks for Rating!!!!',
      });
      return response.data;
    } catch (error: any) {
      console.error('Rating API Error:', error);
    
      return rejectWithValue(error.response.data);
    }
  },
);


export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ courseId, courseData }: { courseId: string; courseData: any }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      if (!token) {
        return rejectWithValue('No access token found');
      }
      const response = await axiosInstance.put(
        `courses/update/${courseId}`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const coursesSlice = createSlice({
  name: 'app',
  initialState: coursesInitialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getCourses.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesData = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(searchCourse.pending, state => {
        state.searchLoading = true;
        state.searchError = '';
      })
      .addCase(searchCourse.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchCourse.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload as string;
      })

      .addCase(getCategories.pending, state => {
        state.categoriesLoading = true;
        state.categoriesError = '';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.coursesData = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload as string;
      })

      .addCase(getTopInstructor.pending, state => {
        state.instructorLoading = true;
        state.instructorError = '';
      })
      .addCase(getTopInstructor.fulfilled, (state, action) => {
        state.instructorLoading = false;
        state.coursesData = action.payload;
      })
      .addCase(getTopInstructor.rejected, (state, action) => {
        state.instructorLoading = false;
        state.instructorError = action.payload as string;
      })

      .addCase(getCourseDetail.pending, state => {
        state.courseDetailLoading = true;
        state.courseDetailError = '';
      })
      .addCase(getCourseDetail.fulfilled, (state, action) => {
        state.courseDetailLoading = false;
        state.coursesData = action.payload;
      })
      .addCase(getCourseDetail.rejected, (state, action) => {
        state.courseDetailLoading = false;
        state.courseDetailError = action.payload as string;
      })

      .addCase(getUserCourse.pending, state => {
        state.getUserCourseLoading = true;
        state.getUserCourseError = '';
      })
      .addCase(getUserCourse.fulfilled, (state, action) => {
        state.getUserCourseLoading = false;
        state.userCourseData = action.payload;
      })
      .addCase(getUserCourse.rejected, (state, action) => {
        state.getUserCourseLoading = false;
        state.getUserCourseError = action.error.message || '';
      })
      .addCase(getCourseContent.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getCourseContent.fulfilled, (state, action) => {
        state.loading = false;
        state.courseContent = action.payload;
      })
      .addCase(getCourseContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadFileMessage = action.payload.message;
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.createCourseMessage = action.payload.message;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(getRecommandedCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecommandedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.createCourseMessage = action.payload.message;
      })
      .addCase(getRecommandedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(updateLectureStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLectureStatus.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateLectureStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(deleteCourseContent.fulfilled, (state, action) => {
        console.log('Lecture Deleted Successfully', action.payload);
    })
    .addCase(updateCourseRating.fulfilled, (state, action) => {
      console.log('Rating Success:', action.payload);
    })
    .addCase(updateCourse.pending, (state) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(updateCourse.fulfilled, (state, action) => {
      state.loading = false;
     
    })
    .addCase(updateCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = '';
    });

  },
});

export default coursesSlice.reducer;
