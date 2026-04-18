'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'

export default function NewProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI变现',
    difficulty: 'beginner',
    estimatedIncome: '',
    description: '',
    
    // 项目详情各个模块
    whatIsIt: '', // 这是什么项目
    cases: '', // 案例
    howToStart: '', // 怎么做
    resources: '', // 需要什么资源
    risks: '', // 风险提示
    income: '', // 收益分析
    suitable: '', // 适合人群
    steps: '', // 操作步骤
    tools: '', // 需要的工具
    tips: '', // 注意事项
    
    tags: [] as string[],
    newTag: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 组合完整的内容
    const fullContent = `
# 这是什么项目

${formData.whatIsIt}

# 案例展示

${formData.cases}

# 怎么做

${formData.howToStart}

# 需要什么资源

${formData.resources}

# 收益分析

${formData.income}

# 适合人群

${formData.suitable}

# 操作步骤

${formData.steps}

# 需要的工具

${formData.tools}

# 注意事项

${formData.tips}

# 风险提示

${formData.risks}
`

    const projectData = {
      title: formData.title,
      category: formData.category,
      difficulty: formData.difficulty,
      estimatedIncome: formData.estimatedIncome,
      description: formData.description,
      content: fullContent.trim(),
      tags: formData.tags,
      createdAt: new Date().toISOString(),
    }

    console.log('创建项目:', projectData)
    
    // TODO: 保存到数据库
    alert('项目创建成功!')
    router.push('/admin/content')
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
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/content">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">创建新项目</h2>
            <p className="text-gray-600 mt-1">填写项目详细信息</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            预览
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            保存项目
          </Button>
        </div>
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
                项目标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="例如: AI工具实战:我是如何月入3万的"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目分类 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="AI变现">AI变现</option>
                  <option value="内容变现">内容变现</option>
                  <option value="电商">电商</option>
                  <option value="出海">出海</option>
                  <option value="知识付费">知识付费</option>
                  <option value="私域运营">私域运营</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  难度等级 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">入门</option>
                  <option value="intermediate">进阶</option>
                  <option value="advanced">高级</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  预估收益 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.estimatedIncome}
                  onChange={(e) => setFormData({ ...formData, estimatedIncome: e.target.value })}
                  placeholder="例如: 月入1-3万"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                项目简介 <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="简要描述项目内容和特点..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

        {/* 这是什么项目 */}
        <Card>
          <CardHeader>
            <CardTitle>这是什么项目</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={6}
              value={formData.whatIsIt}
              onChange={(e) => setFormData({ ...formData, whatIsIt: e.target.value })}
              placeholder="详细介绍这个项目是做什么的,有什么特点..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 案例展示 */}
        <Card>
          <CardHeader>
            <CardTitle>案例展示</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={8}
              value={formData.cases}
              onChange={(e) => setFormData({ ...formData, cases: e.target.value })}
              placeholder="分享真实案例,包括数据、效果等..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 怎么做 */}
        <Card>
          <CardHeader>
            <CardTitle>怎么做</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={10}
              value={formData.howToStart}
              onChange={(e) => setFormData({ ...formData, howToStart: e.target.value })}
              placeholder="详细说明如何开始这个项目,具体步骤..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 需要什么资源 */}
        <Card>
          <CardHeader>
            <CardTitle>需要什么资源</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={6}
              value={formData.resources}
              onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
              placeholder="列出需要的资源:资金、时间、技能、工具等..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 收益分析 */}
        <Card>
          <CardHeader>
            <CardTitle>收益分析</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={6}
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: e.target.value })}
              placeholder="分析收益来源、收益模式、预期收入等..."
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
              value={formData.suitable}
              onChange={(e) => setFormData({ ...formData, suitable: e.target.value })}
              placeholder="说明这个项目适合什么样的人..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 操作步骤 */}
        <Card>
          <CardHeader>
            <CardTitle>操作步骤</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={8}
              value={formData.steps}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              placeholder="列出详细的操作步骤,可以用数字编号..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 需要的工具 */}
        <Card>
          <CardHeader>
            <CardTitle>需要的工具</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={4}
              value={formData.tools}
              onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              placeholder="列出需要使用的工具、软件、平台等..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 注意事项 */}
        <Card>
          <CardHeader>
            <CardTitle>注意事项</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={6}
              value={formData.tips}
              onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
              placeholder="提醒需要注意的事项、常见问题等..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 风险提示 */}
        <Card>
          <CardHeader>
            <CardTitle>风险提示</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={4}
              value={formData.risks}
              onChange={(e) => setFormData({ ...formData, risks: e.target.value })}
              placeholder="说明可能存在的风险和应对方法..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {/* 底部操作按钮 */}
        <div className="flex justify-end gap-4 sticky bottom-0 bg-white p-4 border-t">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            取消
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            保存项目
          </Button>
        </div>
      </form>
    </div>
  )
}
