alter table public.projects
add column if not exists progress text not null default '开发中';

update public.projects
set progress = case
  when status = 'published' then '已上线'
  when status = 'archived' then '已归档'
  else '开发中'
end
where progress = '开发中'
  and status in ('published', 'archived');
