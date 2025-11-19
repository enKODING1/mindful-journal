import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Container from '@/components/ui/atom/Container';
import Button from '@/components/ui/atom/Button';
import TextArea from '@/components/ui/atom/TextArea';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Container',
    component: Container,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        maxWidth: '2xl',
        padding: 'md',
        gap: 'md',
        rounded: '2xl',
        variant: 'base-300',
        centered: true,
        children: (
            <>
                <p className="text-lg font-semibold">컨테이너 예제</p>
                <p>이것은 기본 Container 컴포넌트입니다.</p>
                <Button variant="primary">버튼</Button>
            </>
        ),
    },
};

export const WithTextArea: Story = {
    args: {
        maxWidth: '2xl',
        padding: 'md',
        gap: 'md',
        rounded: '2xl',
        variant: 'base-300',
        centered: true,
        children: (
            <>
                <p>오늘 하루는 어떠셨나요?</p>
                <TextArea
                    variant="neutral"
                    inputSize="md"
                    placeholder="오늘 하루 있었던 일들, 느꼈던 감정들을 자유롭게 적어보세요..."
                    className="w-full h-60"
                />
                <div className="w-full items-center flex justify-center">
                    <Button variant="primary" soft={true}>
                        오늘의 이야기 보관하기
                    </Button>
                </div>
            </>
        ),
    },
};

export const DifferentSizes: Story = {
    render: () => (
        <div className="space-y-4 p-4">
            <Container maxWidth="sm" padding="md" gap="md" rounded="lg" variant="base-200">
                <p>Small Container (max-w-sm)</p>
            </Container>
            <Container maxWidth="md" padding="md" gap="md" rounded="lg" variant="base-200">
                <p>Medium Container (max-w-md)</p>
            </Container>
            <Container maxWidth="lg" padding="md" gap="md" rounded="lg" variant="base-200">
                <p>Large Container (max-w-lg)</p>
            </Container>
            <Container maxWidth="2xl" padding="md" gap="md" rounded="lg" variant="base-200">
                <p>2XL Container (max-w-2xl)</p>
            </Container>
        </div>
    ),
};

export const DifferentVariants: Story = {
    render: () => (
        <div className="space-y-4 p-4">
            <Container maxWidth="md" padding="md" gap="md" rounded="lg" variant="base-100">
                <p>Base-100 Variant</p>
            </Container>
            <Container maxWidth="md" padding="md" gap="md" rounded="lg" variant="base-200">
                <p>Base-200 Variant</p>
            </Container>
            <Container maxWidth="md" padding="md" gap="md" rounded="lg" variant="base-300">
                <p>Base-300 Variant</p>
            </Container>
            <Container maxWidth="md" padding="md" gap="md" rounded="lg" variant="primary">
                <p>Primary Variant</p>
            </Container>
        </div>
    ),
};

