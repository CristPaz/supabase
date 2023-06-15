import { useParams } from 'common'
import { Markdown } from 'components/interfaces/Markdown'
import { useIntegrationsQuery } from 'data/integrations/integrations-query'
import { useStore } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useGithubConnectionConfigPanelSnapshot } from 'state/github-connection-config-panel'
import { IconGitHub, IconSearch, Input, Select, SidePanel } from 'ui'

const GitHubRepoSelection = () => {
  const { ui } = useStore()
  const { slug } = useParams()
  const { data } = useIntegrationsQuery({ orgSlug: slug })

  const githubConnectionConfigPanelSnapshot = useGithubConnectionConfigPanelSnapshot()

  const githubIntegrations = data?.filter((integration) => integration.type === 'GITHUB')

  return (
    <SidePanel
      header={'Add GitHub repository'}
      size="large"
      visible={githubConnectionConfigPanelSnapshot.visible}
      onCancel={() => githubConnectionConfigPanelSnapshot.setVisible(false)}
    >
      <div className="my-10 flex flex-col gap-6">
        <SidePanel.Content>
          <Markdown
            content={`
### Choose repository to connect to

Check the details below before proceeding
          `}
          />
        </SidePanel.Content>
        <SidePanel.Content className="flex flex-col gap-2">
          <label className="text-sm text-scale-900">GitHub scope / organisation</label>
          <div className="flex gap-3 w-full">
            <Select icon={<IconGitHub />} className="w-full">
              <Select.Option value="mildtomato">MildTomato</Select.Option>
              <Select.Option value="supabase">Supabase</Select.Option>
            </Select>
            <Input autoFocus icon={<IconSearch />} className="w-full" placeholder="Search..." />
          </div>
        </SidePanel.Content>
        <SidePanel.Content>
          <ul>
            <li className="border px-10">
              {/* <IntegrationConnectionOption connection={githubIntegrations[0]} /> */}
            </li>
          </ul>
        </SidePanel.Content>
      </div>
    </SidePanel>
  )
}

export default observer(GitHubRepoSelection)
