import { TestCaseStatus } from '@/utils/types'

export function getStatusColor(status: TestCaseStatus) {
  switch (status) {
    case TestCaseStatus.Available:
      return 'bg-cyan-500'
    case TestCaseStatus.Blocked:
      return 'bg-purple-800'
    case TestCaseStatus.Cancelled:
      return 'bg-gray-700'
    case TestCaseStatus.Executing:
      return 'bg-blue-500'
    case TestCaseStatus.Fail:
      return 'bg-red-500'
    case TestCaseStatus.NotExecuted:
      return 'bg-gray-500'
    case TestCaseStatus.Pass:
      return 'bg-green-500'
  }
}
