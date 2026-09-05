import json
import unittest
from hook_test_support import HookTestCase


class BiomeTests(HookTestCase):
    def test_running_container_belongs_to_current_compose_project(self):
        path = self.file('src/a "quoted" file.ts')
        self.env['HOOK_CONTAINER'] = 'current-worktree-container'
        result = self.invoke(cwd=self.root / 'sub', tool_input={'file_path': str(path)})
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn(['docker', ['exec', 'current-worktree-container', 'npx', '--no-install',
                                 'biome', 'check', '--write', '/app/src/a "quoted" file.ts']], self.commands())

    def test_no_running_container_uses_compose_run(self):
        self.env['HOOK_PS_UNCREATED'] = '1'
        path = self.file('src/a.ts')
        result = self.invoke(tool_input={'file_path': str(path)})
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertTrue(any(args[:6] == ['compose', 'run', '--rm', '--no-deps', 'app', 'npx'] for _, args in self.commands()))

    def test_codex_patch_and_claude_write_both_format_files(self):
        path = self.file('src/a.ts')
        for agent in ['claude', 'codex']:
            payload = {'tool_input': {'file_path': str(path)}} if agent == 'claude' else {
                'tool_name': 'apply_patch', 'tool_input': {'command': '*** Begin Patch\n*** Update File: src/a.ts\n*** End Patch'}}
            result = self.invoke(agent=agent, **payload)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue(any('/app/src/a.ts' in args for _, args in self.commands()))

    def test_lint_failure_is_reported_without_blocking(self):
        path = self.file('src/a.ts')
        self.env['HOOK_FAIL_MATCH'] = 'biome'
        result = self.invoke(tool_input={'file_path': str(path)})
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('fixture diagnostic', json.loads(result.stdout)['hookSpecificOutput']['additionalContext'])

    def test_docker_unavailable_does_not_block_or_start_container(self):
        path = self.file('src/a.ts')
        self.env['HOOK_DOCKER_DOWN'] = '1'
        result = self.invoke(tool_input={'file_path': str(path)})
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertFalse(any('run' in args for _, args in self.commands()))

    def test_non_biome_file_is_ignored(self):
        path = self.file('README.md')
        result = self.invoke(tool_input={'file_path': str(path)})
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.commands(), [])


if __name__ == '__main__':
    unittest.main()
