import React from 'react';
import styled from '@emotion/styled';

import Count from 'app/components/count';
import DateTime from 'app/components/dateTime';
import Link from 'app/components/links/link';
import TimeSince from 'app/components/timeSince';
import Version from 'app/components/version';
import {t, tn} from 'app/locale';
import space from 'app/styles/space';
import {ReleaseMeta, ReleaseWithHealth} from 'app/types';

import {SectionHeading, Wrapper} from './styles';

type Props = {
  release: ReleaseWithHealth;
  releaseMeta: ReleaseMeta;
  orgSlug: string;
  projectSlug: string;
};

const ProjectReleaseDetails = ({release, releaseMeta, orgSlug, projectSlug}: Props) => {
  const {version, dateCreated, firstEvent, lastEvent} = release;

  return (
    <Wrapper>
      <SectionHeading>{t('Project Release Details')}</SectionHeading>
      <StyledTable>
        <tbody>
          <StyledTr>
            <TagKey>{t('Created')}</TagKey>
            <TagValue>
              <DateTime date={dateCreated} seconds={false} />
            </TagValue>
          </StyledTr>

          <StyledTr>
            <TagKey>{t('Version')}</TagKey>
            <TagValue>
              <Version version={version} anchor={false} />
            </TagValue>
          </StyledTr>

          <StyledTr>
            <TagKey>{t('First Event')}</TagKey>
            <TagValue>{firstEvent ? <TimeSince date={firstEvent} /> : '-'}</TagValue>
          </StyledTr>

          <StyledTr>
            <TagKey>{t('Last Event')}</TagKey>
            <TagValue>{lastEvent ? <TimeSince date={lastEvent} /> : '-'}</TagValue>
          </StyledTr>

          <StyledTr>
            <TagKey>{t('Source Maps')}</TagKey>
            <TagValue>
              <Link
                to={`/settings/${orgSlug}/projects/${projectSlug}/source-maps/${encodeURIComponent(
                  version
                )}/`}
              >
                <Count value={releaseMeta.releaseFileCount} />{' '}
                {tn('artifact', 'artifacts', releaseMeta.releaseFileCount)}
              </Link>
            </TagValue>
          </StyledTr>
        </tbody>
      </StyledTable>
    </Wrapper>
  );
};

const StyledTable = styled('table')`
  table-layout: fixed;
  width: 100%;
  max-width: 100%;
`;

const StyledTr = styled('tr')`
  &:nth-child(2n + 1) td {
    background-color: ${p => p.theme.backgroundSecondary};
  }
`;

const TagKey = styled('td')`
  color: ${p => p.theme.textColor};
  padding: ${space(0.5)} ${space(1)};
  font-size: ${p => p.theme.fontSizeMedium};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagValue = styled(TagKey)`
  text-align: right;
  color: ${p => p.theme.subText};
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    width: 160px;
  }
`;

export default ProjectReleaseDetails;
