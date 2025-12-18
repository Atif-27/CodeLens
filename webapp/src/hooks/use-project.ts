
import { api } from '@/trpc/react';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const useProject = () => {
    const { data: projects, isLoading } = api.project.getProjects.useQuery();
    const [projectId, setProjectId] = useLocalStorage('dionysus-project-id', '');
    const project = projects?.find((project) => project.id === String(projectId));
    return {
        project,
        projects,
        projectId,
        setProjectId,
        isLoading
    };
};

export default useProject;