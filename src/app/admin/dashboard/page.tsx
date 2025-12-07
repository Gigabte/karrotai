'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import * as XLSX from 'xlsx'
import {
  Shield,
  Users,
  MousePointerClick,
  Globe,
  TrendingUp,
  UserPlus,
  LogOut,
  RefreshCw,
  Mail,
  Calendar,
  Percent,
  Link2,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Download,
  Filter,
  X,
  ChevronDown,
  Trash2,
  AlertTriangle
} from 'lucide-react'

interface Stats {
  overview: {
    totalWaitlist: number
    totalClicks: number
    totalPromoters: number
    directSignups: number
    referredSignups: number
    recentSignups: number
    conversionRate: string
  }
  waitlistByCountry: Array<{ country: string; count: number }>
  clicksByCountry: Array<{ country: string; count: number }>
  promoters: Array<{
    id: string
    name: string
    email: string
    referralCode: string
    commission: number
    clicks: number
    signups: number
    conversionRate: string
    createdAt: string
  }>
  waitlistUsers: Array<{
    id: string
    email: string
    country: string
    city: string
    referralCode: string | null
    promoterName: string | null
    createdAt: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [adminName, setAdminName] = useState('')
  const [activeTab, setActiveTab] = useState<'overview' | 'waitlist' | 'promoters'>('overview')
  const [showFilters, setShowFilters] = useState(false)
  const [countryFilter, setCountryFilter] = useState<string>('')
  const [promoterFilter, setPromoterFilter] = useState<string>('')
  const [sourceFilter, setSourceFilter] = useState<'all' | 'direct' | 'referred'>('all')
  const [dateFromFilter, setDateFromFilter] = useState<string>('')
  const [dateToFilter, setDateToFilter] = useState<string>('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [promoterToDelete, setPromoterToDelete] = useState<{ id: string; name: string } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  // Get unique countries and promoters for filter dropdowns
  const uniqueCountries = useMemo(() => {
    if (!stats?.waitlistUsers) return []
    const countries = [...new Set(stats.waitlistUsers.map(u => u.country))]
    return countries.filter(Boolean).sort()
  }, [stats?.waitlistUsers])

  const uniquePromoters = useMemo(() => {
    if (!stats?.promoters) return []
    return stats.promoters.map(p => ({ name: p.name, code: p.referralCode }))
  }, [stats?.promoters])

  // Filter waitlist users
  const filteredUsers = useMemo(() => {
    if (!stats?.waitlistUsers) return []
    
    return stats.waitlistUsers.filter(user => {
      // Country filter
      if (countryFilter && user.country !== countryFilter) return false
      
      // Promoter filter
      if (promoterFilter && user.referralCode !== promoterFilter) return false
      
      // Source filter
      if (sourceFilter === 'direct' && user.promoterName) return false
      if (sourceFilter === 'referred' && !user.promoterName) return false
      
      // Date filters
      if (dateFromFilter) {
        const userDate = new Date(user.createdAt)
        const fromDate = new Date(dateFromFilter)
        if (userDate < fromDate) return false
      }
      
      if (dateToFilter) {
        const userDate = new Date(user.createdAt)
        const toDate = new Date(dateToFilter)
        toDate.setHours(23, 59, 59, 999)
        if (userDate > toDate) return false
      }
      
      return true
    })
  }, [stats?.waitlistUsers, countryFilter, promoterFilter, sourceFilter, dateFromFilter, dateToFilter])

  // Export to Excel function
  const exportToExcel = () => {
    if (!filteredUsers.length) return

    const exportData = filteredUsers.map(user => ({
      'Email': user.email,
      'Country': user.country,
      'City': user.city,
      'Source': user.promoterName ? 'Referred' : 'Direct',
      'Promoter Name': user.promoterName || '-',
      'Referral Code': user.referralCode || '-',
      'Signed Up': new Date(user.createdAt).toLocaleString()
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Waitlist Users')

    // Auto-size columns
    const maxWidth = 50
    const colWidths = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.min(maxWidth, Math.max(key.length, ...exportData.map(row => String(row[key as keyof typeof row] || '').length)))
    }))
    worksheet['!cols'] = colWidths

    // Generate filename with date and filters
    const filterParts = []
    if (countryFilter) filterParts.push(countryFilter)
    if (promoterFilter) filterParts.push(promoterFilter)
    if (sourceFilter !== 'all') filterParts.push(sourceFilter)
    
    const dateStr = new Date().toISOString().split('T')[0]
    const filterStr = filterParts.length ? `_${filterParts.join('_')}` : ''
    const filename = `karrot_waitlist${filterStr}_${dateStr}.xlsx`

    XLSX.writeFile(workbook, filename)
  }

  // Clear all filters
  const clearFilters = () => {
    setCountryFilter('')
    setPromoterFilter('')
    setSourceFilter('all')
    setDateFromFilter('')
    setDateToFilter('')
  }

  const hasActiveFilters = countryFilter || promoterFilter || sourceFilter !== 'all' || dateFromFilter || dateToFilter

  // Delete promoter function
  const handleDeletePromoter = async () => {
    if (!promoterToDelete) return

    setDeleting(true)
    try {
      const email = localStorage.getItem('adminEmail')
      const res = await fetch(`/api/admin/promoters/${promoterToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-email': email || ''
        }
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete promoter')
      }

      // Refresh stats after deletion
      if (email) fetchStats(email)
      setDeleteModalOpen(false)
      setPromoterToDelete(null)
    } catch (error) {
      console.error('Error deleting promoter:', error)
      alert(error instanceof Error ? error.message : 'Failed to delete promoter')
    } finally {
      setDeleting(false)
    }
  }

  const openDeleteModal = (promoter: { id: string; name: string }) => {
    setPromoterToDelete(promoter)
    setDeleteModalOpen(true)
  }

  useEffect(() => {
    const email = localStorage.getItem('adminEmail')
    const name = localStorage.getItem('adminName')
    
    if (!email) {
      router.push('/admin/login')
      return
    }

    setAdminName(name || 'Admin')
    fetchStats(email)
  }, [router])

  const fetchStats = async (email: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/stats', {
        headers: {
          'x-admin-email': email
        }
      })

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('adminEmail')
          localStorage.removeItem('adminName')
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch stats')
      }

      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminName')
    router.push('/admin/login')
  }

  const handleRefresh = () => {
    const email = localStorage.getItem('adminEmail')
    if (email) fetchStats(email)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/">
              <Image src="/logo.svg" alt="Karrot AI" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10" />
            </Link>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
              <span className="text-[10px] sm:text-xs text-amber-500 font-medium">ADMIN</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:block text-zinc-500 text-sm">Welcome, <span className="text-white">{adminName}</span></span>
            <button
              onClick={handleRefresh}
              className="p-1.5 sm:p-2 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-zinc-400" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-zinc-800 hover:border-red-500/50 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Dashboard</h1>
            <p className="text-zinc-500 text-sm sm:text-base">Complete overview of Karrot AI waitlist and promoter performance</p>
          </div>
          <Link 
            href="/admin/newsletter"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-medium transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Send Newsletter</span>
          </Link>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/30">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-emerald-500/10">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
              </div>
              <span className="text-[10px] sm:text-xs text-emerald-500 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                +{stats?.overview.recentSignups || 0} this week
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">{stats?.overview.totalWaitlist || 0}</p>
            <p className="text-zinc-500 text-xs sm:text-sm">Total Waitlist</p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/30">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-500/10">
                <MousePointerClick className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">{stats?.overview.totalClicks || 0}</p>
            <p className="text-zinc-500 text-xs sm:text-sm">Total Clicks</p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/30">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-purple-500/10">
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">{stats?.overview.totalPromoters || 0}</p>
            <p className="text-zinc-500 text-xs sm:text-sm">Total Promoters</p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-zinc-800 bg-zinc-900/30">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-amber-500/10">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">{stats?.overview.conversionRate || '0.00'}%</p>
            <p className="text-zinc-500 text-xs sm:text-sm">Conversion Rate</p>
          </div>
        </motion.div>

        {/* Secondary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/20 flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg bg-zinc-800">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-semibold text-white">{stats?.overview.directSignups || 0}</p>
              <p className="text-zinc-500 text-[10px] sm:text-xs">Direct Signups</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/20 flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg bg-zinc-800">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-semibold text-white">{stats?.overview.referredSignups || 0}</p>
              <p className="text-zinc-500 text-[10px] sm:text-xs">Referred Signups</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/20 flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg bg-zinc-800">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-semibold text-white">{stats?.waitlistByCountry?.length || 0}</p>
              <p className="text-zinc-500 text-[10px] sm:text-xs">Countries Reached</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2"
        >
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'waitlist', label: 'Waitlist', icon: Users },
            { id: 'promoters', label: 'Promoters', icon: UserPlus }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'waitlist' | 'promoters')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Signups by Country */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-zinc-400" />
                  <h3 className="text-lg font-medium text-white">Signups by Country</h3>
                </div>
                <div className="space-y-3">
                  {stats?.waitlistByCountry?.slice(0, 10).map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-zinc-400 text-sm">{country.country}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ 
                              width: `${(country.count / (stats?.overview.totalWaitlist || 1)) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-white text-sm w-8 text-right">{country.count}</span>
                      </div>
                    </div>
                  ))}
                  {(!stats?.waitlistByCountry || stats.waitlistByCountry.length === 0) && (
                    <p className="text-zinc-600 text-sm text-center py-4">No data available</p>
                  )}
                </div>
              </div>

              {/* Clicks by Country */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
                <div className="flex items-center gap-2 mb-6">
                  <PieChart className="w-5 h-5 text-zinc-400" />
                  <h3 className="text-lg font-medium text-white">Clicks by Country</h3>
                </div>
                <div className="space-y-3">
                  {stats?.clicksByCountry?.slice(0, 10).map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-zinc-400 text-sm">{country.country}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ 
                              width: `${(country.count / (stats?.overview.totalClicks || 1)) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-white text-sm w-8 text-right">{country.count}</span>
                      </div>
                    </div>
                  ))}
                  {(!stats?.clicksByCountry || stats.clicksByCountry.length === 0) && (
                    <p className="text-zinc-600 text-sm text-center py-4">No data available</p>
                  )}
                </div>
              </div>

              {/* Top Promoters */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-zinc-400" />
                  <h3 className="text-lg font-medium text-white">Top Performing Promoters</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left text-zinc-500 text-xs font-medium py-3 px-2">PROMOTER</th>
                        <th className="text-left text-zinc-500 text-xs font-medium py-3 px-2">CODE</th>
                        <th className="text-center text-zinc-500 text-xs font-medium py-3 px-2">CLICKS</th>
                        <th className="text-center text-zinc-500 text-xs font-medium py-3 px-2">SIGNUPS</th>
                        <th className="text-center text-zinc-500 text-xs font-medium py-3 px-2">CONV.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.promoters?.slice(0, 5).map((promoter) => (
                        <tr key={promoter.id} className="border-b border-zinc-800/50">
                          <td className="py-4 px-2">
                            <div>
                              <p className="text-white text-sm">{promoter.name}</p>
                              <p className="text-zinc-600 text-xs">{promoter.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">
                              {promoter.referralCode}
                            </code>
                          </td>
                          <td className="py-4 px-2 text-center text-zinc-300">{promoter.clicks}</td>
                          <td className="py-4 px-2 text-center text-zinc-300">{promoter.signups}</td>
                          <td className="py-4 px-2 text-center">
                            <span className={`text-sm ${parseFloat(promoter.conversionRate) > 0 ? 'text-emerald-500' : 'text-zinc-500'}`}>
                              {promoter.conversionRate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(!stats?.promoters || stats.promoters.length === 0) && (
                    <p className="text-zinc-600 text-sm text-center py-8">No promoters yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'waitlist' && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              {/* Header with Export and Filter buttons */}
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-zinc-400" />
                    <h3 className="text-lg font-medium text-white">All Waitlist Users</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 text-sm">
                      {filteredUsers.length} of {stats?.waitlistUsers?.length || 0} users
                    </span>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                        hasActiveFilters 
                          ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                      {hasActiveFilters && (
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </button>
                    <button
                      onClick={exportToExcel}
                      disabled={filteredUsers.length === 0}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-4 h-4" />
                      Export XLSX
                    </button>
                  </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-zinc-800"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* Country Filter */}
                      <div>
                        <label className="block text-zinc-500 text-xs mb-2">Country</label>
                        <div className="relative">
                          <select
                            value={countryFilter}
                            onChange={(e) => setCountryFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm appearance-none cursor-pointer focus:border-zinc-600 focus:outline-none"
                          >
                            <option value="">All Countries</option>
                            {uniqueCountries.map(country => (
                              <option key={country} value={country}>{country}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>
                      </div>

                      {/* Promoter Filter */}
                      <div>
                        <label className="block text-zinc-500 text-xs mb-2">Promoter</label>
                        <div className="relative">
                          <select
                            value={promoterFilter}
                            onChange={(e) => setPromoterFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm appearance-none cursor-pointer focus:border-zinc-600 focus:outline-none"
                          >
                            <option value="">All Promoters</option>
                            {uniquePromoters.map(promoter => (
                              <option key={promoter.code} value={promoter.code}>
                                {promoter.name} ({promoter.code})
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>
                      </div>

                      {/* Source Filter */}
                      <div>
                        <label className="block text-zinc-500 text-xs mb-2">Source</label>
                        <div className="relative">
                          <select
                            value={sourceFilter}
                            onChange={(e) => setSourceFilter(e.target.value as 'all' | 'direct' | 'referred')}
                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm appearance-none cursor-pointer focus:border-zinc-600 focus:outline-none"
                          >
                            <option value="all">All Sources</option>
                            <option value="direct">Direct Only</option>
                            <option value="referred">Referred Only</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>
                      </div>

                      {/* Date From */}
                      <div>
                        <label className="block text-zinc-500 text-xs mb-2">From Date</label>
                        <input
                          type="date"
                          value={dateFromFilter}
                          onChange={(e) => setDateFromFilter(e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:border-zinc-600 focus:outline-none"
                        />
                      </div>

                      {/* Date To */}
                      <div>
                        <label className="block text-zinc-500 text-xs mb-2">To Date</label>
                        <input
                          type="date"
                          value={dateToFilter}
                          onChange={(e) => setDateToFilter(e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:border-zinc-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={clearFilters}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm transition-all"
                        >
                          <X className="w-4 h-4" />
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/50">
                      <th className="text-left text-zinc-500 text-xs font-medium py-3 px-6">EMAIL</th>
                      <th className="text-left text-zinc-500 text-xs font-medium py-3 px-4">COUNTRY</th>
                      <th className="text-left text-zinc-500 text-xs font-medium py-3 px-4">CITY</th>
                      <th className="text-left text-zinc-500 text-xs font-medium py-3 px-4">REFERRED BY</th>
                      <th className="text-left text-zinc-500 text-xs font-medium py-3 px-4">SIGNED UP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-zinc-600" />
                            <span className="text-white text-sm">{user.email}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-zinc-600" />
                            <span className="text-zinc-400 text-sm">{user.country}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-zinc-400 text-sm">{user.city}</td>
                        <td className="py-4 px-4">
                          {user.promoterName ? (
                            <div className="flex items-center gap-2">
                              <Link2 className="w-4 h-4 text-purple-500" />
                              <span className="text-purple-400 text-sm">{user.promoterName}</span>
                              <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500">
                                {user.referralCode}
                              </code>
                            </div>
                          ) : (
                            <span className="text-zinc-600 text-sm">Direct</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-zinc-600" />
                            <span className="text-zinc-400 text-sm">{formatDate(user.createdAt)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500">
                      {hasActiveFilters ? 'No users match your filters' : 'No waitlist signups yet'}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-3 text-amber-500 hover:text-amber-400 text-sm"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'promoters' && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-zinc-400" />
                  <h3 className="text-lg font-medium text-white">All Promoters</h3>
                </div>
                <span className="text-zinc-500 text-sm">{stats?.promoters?.length || 0} total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/50">
                      <th className="text-left text-zinc-500 text-xs font-medium py-3 px-6">PROMOTER</th>
                      <th className="text-left text-zinc-500 text-xs font-medium py-3 px-4">REFERRAL CODE</th>
                      <th className="text-center text-zinc-500 text-xs font-medium py-3 px-4">CLICKS</th>
                      <th className="text-center text-zinc-500 text-xs font-medium py-3 px-4">SIGNUPS</th>
                      <th className="text-center text-zinc-500 text-xs font-medium py-3 px-4">CONVERSION</th>
                      <th className="text-center text-zinc-500 text-xs font-medium py-3 px-4">COMMISSION</th>
                      <th className="text-left text-zinc-500 text-xs font-medium py-3 px-4">JOINED</th>
                      <th className="text-center text-zinc-500 text-xs font-medium py-3 px-4">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.promoters?.map((promoter) => (
                      <tr key={promoter.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-white text-sm font-medium">{promoter.name}</p>
                            <p className="text-zinc-600 text-xs">{promoter.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <code className="text-sm bg-zinc-800 px-2 py-1 rounded text-amber-400 font-mono">
                            {promoter.referralCode}
                          </code>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <MousePointerClick className="w-4 h-4 text-blue-500" />
                            <span className="text-white">{promoter.clicks}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Users className="w-4 h-4 text-emerald-500" />
                            <span className="text-white">{promoter.signups}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`text-sm font-medium ${parseFloat(promoter.conversionRate) > 0 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                            {promoter.conversionRate}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Percent className="w-4 h-4 text-amber-500" />
                            <span className="text-amber-400">{promoter.commission}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-zinc-600" />
                            <span className="text-zinc-400 text-sm">{formatDate(promoter.createdAt)}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => openDeleteModal({ id: promoter.id, name: promoter.name })}
                            className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete promoter"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(!stats?.promoters || stats.promoters.length === 0) && (
                  <div className="text-center py-12">
                    <UserPlus className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500">No promoters registered yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-red-500/10">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">Delete Promoter</h3>
              </div>
              
              <p className="text-zinc-400 mb-2">
                Are you sure you want to delete <span className="text-white font-medium">{promoterToDelete?.name}</span>?
              </p>
              <p className="text-zinc-500 text-sm mb-6">
                This will permanently remove the promoter and all their associated clicks. Waitlist signups they referred will be kept but unlinked.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setDeleteModalOpen(false)
                    setPromoterToDelete(null)
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePromoter}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-zinc-600 text-sm">© 2024 Karrot AI. Admin Dashboard.</p>
          <a href="mailto:contact@karrotai.app" className="text-zinc-500 hover:text-white text-sm transition-colors">
            contact@karrotai.app
          </a>
        </div>
      </footer>
    </div>
  )
}
