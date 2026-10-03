import { useState, type FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Alert,
  AppShell,
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  GridItem,
  Heading,
  Inline,
  NavItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  Text,
  TextField,
  Textarea,
  Divider,
} from '../index';
import { ChartIcon, HomeIcon, MailIcon, SearchIcon, SettingsIcon, UsersIcon, WaveLogo } from './icons';

const meta: Meta = {
  title: 'Examples',
  tags: ['!autodocs'],
  parameters: { fullBleed: true },
};
export default meta;

export const SignUpForm: StoryObj = {
  name: 'Sign-up form',
  render: function Render() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [done, setDone] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const next: Record<string, string> = {};
      if (!data.get('name')) next.name = 'Enter your name.';
      if (!String(data.get('email')).includes('@')) next.email = 'Enter a valid email address.';
      if (String(data.get('password')).length < 8) next.password = 'Use at least 8 characters.';
      if (!data.get('terms')) next.terms = 'You need to accept the terms.';
      setErrors(next);
      setDone(Object.keys(next).length === 0);
    };

    return (
      <Container size="sm" style={{ paddingBlock: 48 }}>
          <form onSubmit={onSubmit} noValidate>
          <Card
            variant="elevated"
            padding="lg"
            title="Create your account"
            description="Start your 14-day free trial. No card required."
          >
            <Stack gap={5}>
              {Object.keys(errors).length > 0 && (
                <Alert tone="danger" title="There's a problem">
                  Check the highlighted fields below.
                </Alert>
              )}
              {done && <Alert tone="success" title="Account created. Welcome aboard!" />}
              <TextField name="name" label="Full name" autoComplete="name" required error={errors.name} />
              <TextField name="email" type="email" label="Email" autoComplete="email" leading={<MailIcon />} required error={errors.email} />
              <TextField
                name="password"
                type="password"
                label="Password"
                autoComplete="new-password"
                hint="At least 8 characters."
                required
                error={errors.password}
              />
              <Select
                name="role"
                label="What best describes you?"
                placeholder="Select one"
                options={[
                  { value: 'dev', label: 'Developer' },
                  { value: 'design', label: 'Designer' },
                  { value: 'pm', label: 'Product manager' },
                  { value: 'other', label: 'Other' },
                ]}
              />
              <Checkbox name="terms" label="I agree to the Terms of Service and Privacy Policy" error={!!errors.terms} />
              {errors.terms && <Text size="sm" tone="danger">{errors.terms}</Text>}
              <Button type="submit" size="lg" fullWidth>
                Create account
              </Button>
              <Text size="sm" tone="muted" style={{ textAlign: 'center' }}>
                Already have an account? <a href="#">Sign in</a>
              </Text>
            </Stack>
          </Card>
        </form>
      </Container>
    );
  },
};

export const SettingsPage: StoryObj = {
  name: 'App shell with settings',
  render: () => (
    <AppShell
      brand={
        <>
          <WaveLogo /> Tide
        </>
      }
      headerActions={
        <>
          <TextField label="Search" hideLabel size="sm" placeholder="Search…" leading={<SearchIcon />} />
          <Button size="sm">New project</Button>
        </>
      }
      sidebar={
        <>
          <NavItem icon={<HomeIcon />}>Overview</NavItem>
          <NavItem icon={<ChartIcon />}>Analytics</NavItem>
          <NavItem icon={<UsersIcon />}>Team</NavItem>
          <NavItem icon={<SettingsIcon />} active>Settings</NavItem>
        </>
      }
      footer={<Text size="sm" tone="muted">© 2026 Tide Inc.</Text>}
    >
      <Container size="md">
        <Stack gap={8}>
          <Stack gap={1}>
            <Heading level={1} size="xl">Settings</Heading>
            <Text tone="muted">Manage your profile, notifications and workspace preferences.</Text>
          </Stack>

          <Card
            title="Profile"
            description="This information will be shown publicly."
            footer={
              <>
                <Button variant="outline">Cancel</Button>
                <Button>Save profile</Button>
              </>
            }
          >
            <Grid columns={2} gap={5}>
              <TextField label="First name" defaultValue="Ada" />
              <TextField label="Last name" defaultValue="Lovelace" />
              <GridItem span={2}>
                <TextField label="Email" type="email" defaultValue="ada@example.com" leading={<MailIcon />} />
              </GridItem>
              <GridItem span={2}>
                <Textarea label="Bio" hint="A short introduction for your profile." defaultValue="Mathematician and writer." />
              </GridItem>
              <Select
                label="Language"
                defaultValue="en-GB"
                options={[
                  { value: 'en-GB', label: 'English (UK)' },
                  { value: 'en-US', label: 'English (US)' },
                  { value: 'fr', label: 'Français' },
                ]}
              />
              <Select
                label="Timezone"
                defaultValue="Europe/London"
                options={[
                  { value: 'Europe/London', label: 'London (GMT+0)' },
                  { value: 'America/New_York', label: 'New York (GMT-5)' },
                ]}
              />
            </Grid>
          </Card>

          <Card title="Notifications" description="Choose how we keep in touch.">
            <Stack gap={4}>
              <Switch labelPosition="start" label="Email digests" description="A weekly summary of activity." defaultChecked />
              <Divider />
              <Switch labelPosition="start" label="Product updates" description="Occasional news about new features." />
              <Divider />
              <RadioGroup legend="Mentions" inline>
                <Radio value="all" label="All" defaultChecked />
                <Radio value="direct" label="Direct only" />
                <Radio value="none" label="None" />
              </RadioGroup>
            </Stack>
          </Card>

          <Card title="Workspace">
            <Stack gap={5}>
              <Slider label="Default page size" min={10} max={100} step={10} defaultValue={30} showValue />
              <Stack gap={3}>
                <Checkbox label="Show archived projects" />
                <Checkbox label="Compact table rows" defaultChecked />
              </Stack>
            </Stack>
          </Card>

          <Card
            title="Danger zone"
            description="Deleting your workspace removes all projects permanently."
            actions={<Button variant="danger">Delete workspace</Button>}
          />

          <Inline justify="flex-end">
            <Text size="xs" tone="subtle">Last saved 2 minutes ago</Text>
          </Inline>
        </Stack>
      </Container>
    </AppShell>
  ),
};
