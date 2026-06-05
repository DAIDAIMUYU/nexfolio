alter table public.projects
add column if not exists category text not null default '个人网站',
add column if not exists type text not null default '个人网站',
add column if not exists progress text not null default '开发中',
add column if not exists detail text not null default '',
add column if not exists tech_stack text[] not null default '{}',
add column if not exists background text not null default '',
add column if not exists reason text not null default '',
add column if not exists problem text not null default '',
add column if not exists solution text not null default '',
add column if not exists features text[] not null default '{}',
add column if not exists link_status text not null default '暂未上线',
add column if not exists future_plan text[] not null default '{}',
add column if not exists is_featured boolean not null default false,
add column if not exists seo_title text,
add column if not exists seo_description text,
add column if not exists sort_order integer not null default 0,
add column if not exists canonical_url text,
add column if not exists redirect_from text[] not null default '{}';

update public.projects
set progress = case
  when status = 'published' then '已上线'
  when status = 'archived' then '已归档'
  else coalesce(nullif(progress, ''), '开发中')
end
where progress is null
   or progress = ''
   or (progress = '开发中' and status in ('published', 'archived'));
