'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Save, Plus, Trash2, GripVertical } from 'lucide-react'
import Link from 'next/link'

interface CourseModule {
  id: string
  title: string
  duration: string
  lessons: CourseLesson[]
}

interface CourseLesson {
  id: string
  title: string
  duration: string
}

export default function NewVoyagePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'AI变现',
    price: '',
    maxParticipants: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    
    // 简介
    introduction: '',
    
    // 项目简介
    projectIntro: '',
    
    // 目标
    goals: '',
    
    // 适合人群
    suitableFor: '',
    
    // 你将获得
    benefits: '',
    
    tags: [],
    newTag: '',
  })

  const [modules, setModules] = useState<CourseModule[]>([
    {
      id: '1',
      title: '第一阶段',
      duration: '约3天',
      lessons: [
        { id: '1-1', title: '', duration: '1天' }
      ]
    }
  ])

  const addModule = () => {
    const newModule: CourseModule = {
      id: Date.now().toString(),
      title: `第${modules.length + 1}阶段`,
      duration: '约3天',
      lessons: [{ id: `${Date.now()}-1`, title: '', duration: '1天' }]
    }
    setModules([...modules, newModule])
  }

  const removeModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId))
  }

  const updateModule = (moduleId: string, field: keyof CourseModule, value: string) => {
    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, [field]: value } : m
    ))
  }

  const addLesson = (moduleId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, {
            id: `${moduleId}-${m.lessons.length + 1}`,
            title: '',
            duration: '1天'
          }]
        }
      }
      return m
    }))
  }

  const removeLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId)
        }
      }
      return m
    }))
  }

  const updateLesson = (moduleId: string, lessonId: string, field: keyof CourseLesson, value: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map(l => 
            l.id === lessonId ? { ...l, [field]: value } : l
          )
        }
      }
      return m
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const voyageData = {
      ...formData,
      modules,
      status: 'upcoming',
      currentParticipants: 0,
      createdAt: new Date().toISOString(),
    }

    console.log('创建航海:', voyageData)
    alert('航海创建成功!')
    router.push('/admin/voyages')
  }

  const addTag = () => {
    if (formData.newTag && !formData.tags.includes(formData.newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag],
        newTag: '',
      })
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    })
  }

  return (
    <div className="space-y-6 pb-20">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/voyages">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">创建航海训练营</h2>
            <p className="text-gray-600 mt-1">填写航海详细信息和课程内容</p>
          </div>
        </div>
        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          保存航海
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                航海标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="例如: AI 视频 SaaS 网站"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                航海描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="例如: 即让 AI 视频网站，做视频站从 0 到 1 落地"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="AI变现">AI变现</option>
                  <option value="内容变现">内容变现</option>
                  <option value="电商">电商</option>
                  <option value="出海">出海</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  价格 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="例如: ¥199.00"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  最大人数 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                  placeholder="例如: 458"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  报名截止 <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.registrationDeadline}
                  onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  开始时间 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  结束时间 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标签
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={formData.newTag}
                  onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="输入标签后按回车"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button type="button" onClick={addTag} variant="outline">
                  添加
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 简介 */}
        <Card>
          <CardHeader>
            <CardTitle>简介</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={6}
              value={formData.introduction}
              onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
              placeholder="介绍航海的背景、目的和特色..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 项目简介 */}
        <Card>
          <CardHeader>
            <CardTitle>项目简介</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={8}
              value={formData.projectIntro}
              onChange={(e) => setFormData({ ...formData, projectIntro: e.target.value })}
              placeholder="详细介绍项目内容、技术栈、实现方式等..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 我的目标 */}
        <Card>
          <CardHeader>
            <CardTitle>我的目标</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={4}
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              placeholder="说明学员完成航海后能达到的目标..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 适合人群 */}
        <Card>
          <CardHeader>
            <CardTitle>适合人群</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={4}
              value={formData.suitableFor}
              onChange={(e) => setFormData({ ...formData, suitableFor: e.target.value })}
              placeholder="说明这个航海适合什么样的人参加..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 你将获得 */}
        <Card>
          <CardHeader>
            <CardTitle>你将获得</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={6}
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              placeholder="列出学员参加航海能获得的收获和资源..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 航线图(课程内容) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>航线图 - 课程内容</CardTitle>
              <Button type="button" onClick={addModule} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                添加阶段
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {modules.map((module, moduleIndex) => (
              <div key={module.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-4 mb-4">
                  <GripVertical className="h-5 w-5 text-gray-400 mt-2 cursor-move" />
                  
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                        placeholder="阶段名称,如: 第一阶段"
                        className="px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={module.duration}
                        onChange={(e) => updateModule(module.id, 'duration', e.target.value)}
                        placeholder="时长,如: 约3天"
                        className="px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* 课程列表 */}
                    <div className="space-y-2 ml-4">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 w-6">{lessonIndex + 1}</span>
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => updateLesson(module.id, lesson.id, 'title', e.target.value)}
                            placeholder="课程名称"
                            className="flex-1 px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) => updateLesson(module.id, lesson.id, 'duration', e.target.value)}
                            placeholder="时长"
                            className="w-24 px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeLesson(module.id, lesson.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addLesson(module.id)}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        添加课程
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeModule(module.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 底部操作按钮 */}
        <div className="flex justify-end gap-4 sticky bottom-0 bg-white p-4 border-t shadow-lg">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            取消
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            保存航海
          </Button>
        </div>
      </form>
    </div>
  )
}
